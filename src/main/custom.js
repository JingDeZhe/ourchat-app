import { BrowserWindow, app, ipcMain } from 'electron'
import OpenAI from 'openai'
import log from 'electron-log'

export const initCustomEvent = () => {
  ipcMain.on('minimize', () => {
    const win = BrowserWindow.fromId(1)
    win.minimize()
  })

  ipcMain.on('maximize', () => {
    const win = BrowserWindow.fromId(1)
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.on('close', () => {
    app.quit()
  })

  ipcMain.handle('chatWithAi', (e, config) => {
    return chatWithAi(config)
  })
}

export const AI_TYPES = {
  QWEN: { envKey: 'DASHSCOPE_API_KEY', baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
  MOONSHOT: { envKey: 'MOONSHOT_API_KEY', baseURL: 'https://api.moonshot.cn/v1' },
  ZHIPU: { envKey: 'ZHIPU_API_KEY', baseURL: 'https://open.bigmodel.cn/api/paas/v4/' }
}

const AI_PARAMS = {
  QWEN: { model: 'qwen-turbo' },
  MOONSHOT: { model: 'moonshot-v1-8k', temperature: 0.3 },
  ZHIPU: { model: 'glm-3-turbo' }
}

const getClient = (type, key) => {
  if (!AI_TYPES[type]) return null
  const key2 = key || process.env[AI_TYPES[type].envKey]
  if (!key2) return null
  return new OpenAI({
    apiKey: key2,
    baseURL: AI_TYPES[type].baseURL
  })
}

export const chatWithAi = async (config) => {
  const { type, messages, key } = config
  /**@type {OpenAI} */
  const client = getClient(type, key)
  if (!client) return '……'
  const res = await client.chat.completions
    .create({
      ...AI_PARAMS[type],
      messages
    })
    .then((completion) => {
      return completion.choices[0].message.content
    })
    .catch((err) => {
      log.error(err)
      return '...'
    })

  return res
}
