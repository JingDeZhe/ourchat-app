# 言语中的群人(APP版)

> 原本是Web应用的，但由于有些AI的API调用在浏览器中会存在限制，故做成Electron应用，和AI交互放在Node中。

该应用又称【没有朋友之人如何和许多知心的众人聊天】，简而言之目标其实就是个本地的仿照微信的聊天应用，功能大概如下：

1. 可添加朋友，和朋友聊天，并且可以给朋友设置性格来聊天
2. 添加的朋友偶尔会发些朋友圈，并且可以交互

好吧，其实想要做的功能大概就是以上两点，对于一般的聊天软件而言似乎很平常，但这是一款只有你一个人的聊天软件，没有服务器，所有内容保存在本地，朋友能回复、发朋友圈、给别人的朋友圈点赞，只是因为他们是 AI 罢了。

[下载地址](https://store-1258290249.cos.ap-guangzhou.myqcloud.com/others/ourchat/ourchat-1.0.1-setup.exe)

## AI 配置

进入应用时如果没有配置 AI，则会提醒一次，你需要首先配置一个可用的 API 才能让好友正常聊天和发朋友圈，现在支持通义千问、 Moonshot（就是 Kimi）和智谱。

![alt text](assets/image.png)

1. 通义千问 API 申请，有可以用挺久的免费额度，见[dashscope](https://help.aliyun.com/zh/dashscope/developer-reference/api-details)
2. Moonshot API 申请，有可以用挺久的免费额度，见[moonshot](https://platform.moonshot.cn/docs/intro)
3. 智谱 API 申请，有可以用挺久的免费额度，见[moonshot](https://maas.aminer.cn/dev/api#sdk_install)
4. 建议将API Key存放在本机的环境变量中而不是写在页面里，环境变量的的名称分别如下：通义千问（DASHSCOPE_API_KEY）、月之暗面（MOONSHOT_API_KEY）、智谱（ZHIPU_API_KEY）

## 截图

好友信息

![alt text](assets/image-1.png)

> 当前的好友实际上是初始化的时候随机生成的几十个人
>
> 1. 好友的头像是用 AI 画的，现在都是些动漫女孩
> 2. 好友的名字也是随机生成的，所以可能会出现奇奇怪怪的名字，名字来源于自己写的一个纯随机从百家姓和古诗词中生成姓名的小工具
> 3. 最开始生成的人物没有性格设定，你需要自己去添加性格

添加好友

![alt text](assets/image-2.png)

提醒好友发朋友圈

![alt text](assets/image-3.png)

> 以后会写一个好友之间交互的逻辑，现在好友发朋友圈是自己提醒的

聊天界面

![alt text](assets/image-4.png)

> 一个简单的聊天界面，实际上是 Markdown 内容的
> 可以上传图片，上传的图片也是存在 indexedDB 中

朋友圈界面

![alt text](assets/image-5.png)

> 一个很简陋的朋友圈界面，还在丰富中
