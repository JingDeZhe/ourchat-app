import { appendBase } from '@/utils/main'
import { server } from '@/db/server'
import { Image } from 'antd'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const MessageDisplay = ({ message, onContextMenu }) => {
  const { content, type } = message
  const [avatar, setAvatar] = useState(appendBase('/img/avatar-0.jpg'))
  const isImageMessage = content.startsWith('fileStore:')

  useEffect(() => {
    server.getAvatar(message.fromId).then(setAvatar)
  }, [])
  return (
    <div className={cls('message-display', type)}>
      <img className="chat-avatar" src={avatar} />
      <div
        className={cls('message-display-content', type, {
          image: isImageMessage,
        })}
        data-id={message.id}
        onContextMenu={onContextMenu}
      >
        {isImageMessage ? (
          <ImageMessage content={content}></ImageMessage>
        ) : (
          <Markdown
            components={{
              code(props) {
                const { children, className, node, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={oneDark}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {content}
          </Markdown>
        )}
      </div>
    </div>
  )
}

const ImageMessage = ({ content }) => {
  const [url, setUrl] = useState(appendBase('/img/empty-image.png'))

  useEffect(() => {
    server.readFile(content).then(setUrl)
  }, [])

  return <Image src={url} className="image-message"></Image>
}
