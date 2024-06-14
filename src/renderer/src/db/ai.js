import { localGet, localSet } from '@/utils/main'

const EMPTY_RESPONSE = '……'
export const AI_TYPES = {
  QWEN: 'QWEN',
  MOONSHOT: 'MOONSHOT',
  ZHIPU: 'ZHIPU'
}

export const AI_ENV_KEYS = {
  QWEN: 'DASHSCOPE_API_KEY',
  MOONSHOT: 'MOONSHOT_API_KEY',
  ZHIPU: 'ZHIPU_API_KEY'
}

const API_OPTIONS_KEY = 'AI_API_OPTIONS'

export const getEnvAiKey = (type) => window.api?.env?.[AI_ENV_KEYS[type]]
export const getAiOptions = () => {
  const res = localGet(API_OPTIONS_KEY) || { type: AI_TYPES.QWEN }
  if (!res.key) res.key = getEnvAiKey(res.type)
  return res
}

export const isValidAiOptions = () => {
  const { type, key } = getAiOptions()
  const finalKey = key || getEnvAiKey(type)
  return !!finalKey
}

export const isSafeAiOptions = () => {}

export const setAiOptions = (options) => {
  localSet(API_OPTIONS_KEY, options)
}

export const chatWithOther = async (character, message, histories) => {
  if (!isValidAiOptions()) return EMPTY_RESPONSE
  return chatWithAi({ character, message, histories })
}

export const getMoment = async (nickname) => {
  if (!isValidAiOptions()) return EMPTY_RESPONSE
  return chatWithAi({
    character: `你叫${nickname}，是一个很会写朋友圈的人。`,
    message: `请写一篇和你自己相关的朋友圈，不超过60字，记录当前（${new Date().toTimeString()}）发生的趣事，不要包含朋友圈外的其它回答文字。`
  })
}

export const chatWithAi = async (config) => {
  const options = getAiOptions()
  const { character, message, histories = [] } = config
  if (message.startsWith('fileStore:')) return EMPTY_RESPONSE
  const messages = []
  if (character) {
    messages.push({ role: 'system', content: `你在玩角色扮演游戏，是${character}` })
  }
  const histories2 = histories.map((d) => {
    return { role: d.type === 'from' ? 'user' : 'assistant', content: d.content }
  })
  messages.push(...histories2, { role: 'user', content: message })
  if (!window.api) return EMPTY_RESPONSE

  return window.api.chatWithAi({ ...options, messages })
}
