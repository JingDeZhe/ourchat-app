export default {
  edit: 'edit',
  confirm: 'confirm',
  cancel: 'cnacel',
  delete: 'delete',
  chat: 'chat',
  pat: 'pat',
  none: 'none',
  character: 'character',
  contact: 'contact',
  moment: 'moment',
  routerErrorMsg: 'error',
  hide: 'hide',
  info: 'more info',
  deleteAllMessages: 'delete all messages',
  deleteAllMessagesTip: 'sure to delete all messages?',
  setting: 'setting',
  common: 'common',
  successTip: 'successful',
  language: 'language',
  type: 'type',
  addContact: 'Add contact',
  search: 'search',
  ai: {
    label: 'AI',
    qwen: 'qwen',
    moonshot: 'moonshot',
    zhipu: 'glm',
    envTip:
      'It is recommended to store the API Key in the local environment variable instead of writing it on the page. The names of the environment variables are as follows: qwen(DASHSCOPE_API_KEY), moonshot(MOONSHOT_API_KEY), glm(ZHIPU_API_KEY).',
    noOptionsTip:
      'Note that you have not yet configured AI, you need to configure an available AI interface before you can perform subsequent chat and other functions.',
    qwenRefer: 'The QWEN API applications, there is a free quota that can be used for a long time, see',
    moonshotRefer: 'The moonshot API application, there is a free quota that can be used for a long time, see',
    zhipuRefer: 'The GLM API application, there is a free quota that can be used for a long time, see',
    qwenTip:
      'General meaning thousand-question API calls will have cross-domain problems in browsers, so you need to do a layer of proxy. Here, local Node forwarding is used, see',
    moonshotTip:
      'Moonshot can be called in the browser, but there is a strict limit on the interval between requests and the number of token, and it is often inconvenient because of response timeout or frequent requests.',
    zhipuTip: 'GLM can be called in the browser, but the shortcomings are basically similar to those of moonshot.'
  }
}
