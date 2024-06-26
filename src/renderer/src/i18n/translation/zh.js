export default {
  edit: '编辑',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  chat: '聊天',
  pat: '拍一拍',
  none: '无',
  character: '性格',
  contact: '联系人',
  moment: '朋友圈',
  routerErrorMsg: '出错了',
  hide: '隐藏',
  info: '更多信息',
  deleteAllMessages: '删除所有消息',
  deleteAllMessagesTip: '确认删除所有消息？',
  setting: '设置',
  common: '通用',
  successTip: '成功',
  language: '语言',
  type: '类型',
  addContact: '添加好友',
  search: '搜索',
  ai: {
    label: 'AI',
    qwen: '通义千问',
    moonshot: '月之暗面',
    zhipu: '智谱',
    envTip:
      '你可以将API Key存放在本机的环境变量中，也可以在上述配置中修改，环境变量的的名称分别如下：通义千问（DASHSCOPE_API_KEY）、月之暗面（MOONSHOT_API_KEY）、智谱（ZHIPU_API_KEY）',
    noOptionsTip: '注意到你还没进行AI的配置，你需要首先配置一个可用的AI接口才能进行后续的聊天等功能。',
    qwenRefer: '通义千问API申请，有可以用挺久的免费额度，见',
    moonshotRefer: '月之暗面API申请，有可以用挺久的免费额度，见',
    zhipuRefer: '智谱API申请，有可以用挺久的免费额度，见',
    qwenTip: '通义千问的API调用在浏览器中会有跨域问题，因此需要做一层代理，这里使用的是本地的Node转发，见',
    moonshotTip:
      'Moonshot可以在浏览器中调用，但对请求间隔和token数量限制很严格，经常出现响应超时或者请求频繁的问题，比较不方便。',
    zhipuTip: '智谱可以在浏览器中调用，但情况和Moonshot类似，也经常无响应。'
  }
}
