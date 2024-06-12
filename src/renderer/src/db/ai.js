import { localGet, localSet } from '@/utils/main'
import ky from 'ky'

const EMPTY_RESPONSE = '……'
const ERROR_RESPONSE = '请再说一次'
export const TYPE_QWEN = 'TYPE_QWEN' // 通义千问的API调用在浏览器中会有跨域问题，因此需要设置一个本地后台
export const TYPE_MOONSHOT = 'TYPE_MOONSHOT' // Moonshot可以在浏览器中调用，但对请求间隔和token数量限制很严格，不大方便
export const TYPE_ZHIPU = 'TYPE_ZHIPU' // 智谱的情况和Moonshot差不多

const urlTypes = [TYPE_QWEN]
const keyTypes = [TYPE_MOONSHOT, TYPE_ZHIPU]
const API_OPTIONS_KEY = 'AI_API_OPTIONS'

export const getAiOptions = () => {
  const res = localGet(API_OPTIONS_KEY) || { type: TYPE_QWEN }
  return res
}

export const isValidAiOptions = () => {
  const { type, key, url } = getAiOptions()
  if (urlTypes.includes(type) && url) return true
  if (keyTypes.includes(type) && key) return true
  return false
}

export const setAiOptions = (options) => {
  localSet(API_OPTIONS_KEY, options)
}

export const chatWithOther = async (key, character, message) => {
  if (!isValidAiOptions()) return EMPTY_RESPONSE
  return chatWithAi({ key, character, message })
}

export const getMoment = async (key) => {
  if (!isValidAiOptions()) return EMPTY_RESPONSE
  return chatWithAi({
    key,
    character: '你是一个很会写朋友圈的人。',
    message: `帮我写一篇朋友圈，不超过60字，记录当前（${new Date().toTimeString()}）发生的趣事，不要包含朋友圈外的其它回答文字。`,
  })
}

const historyMap = new Map()
export const chatWithAi = async (config) => {
  const options = getAiOptions()
  const { key, character, message } = config
  if (message.startsWith('fileStore:')) return EMPTY_RESPONSE
  let t = historyMap.get(key)
  if (!t) historyMap.set(key, (t = []))
  t.push({ role: 'user', content: message })
  if (t.length > 3) {
    t.splice(0, t.length - 3)
  }
  const messages = [...t]
  if (character) {
    messages.unshift({
      role: 'system',
      content: '你是' + character,
    })
  }

  let request
  const { type } = options
  if (type === TYPE_QWEN) {
    request = ky.post(options.url, {
      json: { messages },
    })
  } else if (type === TYPE_MOONSHOT) {
    request = ky.post('https://api.moonshot.cn/v1/chat/completions', {
      json: {
        model: 'moonshot-v1-8k',
        messages,
        temperature: 0.3,
      },
      headers: {
        Authorization: `Bearer ${options.key}`,
      },
    })
  } else if (type === TYPE_ZHIPU) {
    request = request = ky.post(
      'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      {
        json: {
          model: 'glm-3-turbo',
          messages,
        },
        headers: {
          Authorization: `Bearer ${options.key}`,
        },
      }
    )
  } else {
    return EMPTY_RESPONSE
  }

  return request
    .json()
    .then((d) => {
      const content = d.choices[0].message.content
      t.push({ role: 'assistant', content })
      return content
    })
    .catch((err) => {
      return ERROR_RESPONSE
    })
}
