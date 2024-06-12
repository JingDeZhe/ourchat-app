import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Button, Input, Popover } from 'antd'

export const MessageInput = ({ onSend, tools }) => {
  const [message, setMessage] = useState('')

  const inputRef = useRef(null)
  const inputPos = useRef(0)
  const handleInputBlur = () => {
    const el = inputRef.current.resizableTextArea.textArea
    inputPos.current = el.selectionStart
  }
  const handleSelectEmoji = (v) => {
    setMessage((old) => {
      const index = inputPos.current
      if (index === 0) return old + v.native
      inputPos.current += 1
      return `${old.slice(0, index)}${v.native}${old.slice(index)}`
    })
  }
  const handlePressEnter = (e) => {
    if (!e.shiftKey) {
      if (!message.trim()) {
        toast.warning('Cannot send empty message')
      } else {
        onSend(message)
        setMessage('')
      }
      e.preventDefault()
    }
  }
  return (
    <div className="message-input full-ctn col-ctn gap-2">
      <div className="v-center gap-2 message-input-tools">
        <Popover
          content={() => (
            <Picker
              theme="light"
              data={data}
              onEmojiSelect={handleSelectEmoji}
            />
          )}
          trigger="click"
          overlayInnerStyle={{ padding: 0 }}
        >
          <i className="i-fluent-emoji-flat-grinning-face-with-smiling-eyes"></i>
        </Popover>
        {tools && tools()}
      </div>
      <div className="ctn-body" onBlur={handleInputBlur}>
        <Input.TextArea
          value={message}
          onInput={(e) => setMessage(e.target.value)}
          onPressEnter={handlePressEnter}
          autoSize={false}
          className="block !h-full"
          ref={inputRef}
        ></Input.TextArea>
      </div>
      <div className="text-right">
        <Button onClick={() => onSend(message)}>Send</Button>
      </div>
    </div>
  )
}
