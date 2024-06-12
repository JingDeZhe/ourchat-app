import { server } from '@/db/server'
import Split from 'react-split'
import { MessageInput } from '@/components/MessageInput'
import { MessageDisplay } from '@/components/MessageDisplay'
import { EmptyInfo } from '@/components/EmptyInfo'
import { Spin } from 'antd'
import { MessageManage } from './MessageManage'
import { scrollbarOptions } from '@/composables/main'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { useTranslation } from 'react-i18next'

export const ChatBody = ({ contactId }) => {
  const { t } = useTranslation()
  const [contact, setContact] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [messageManageVisible, setMessageManageVisible] = useState(false)
  const noAutoScroll = useRef(false)
  const scrollbar = useRef(null)

  const refreshMessages = async () => {
    return server.getMessages(contactId).then((d) => {
      setMessages(d)
      setLoading(false)
    })
  }
  useEffect(() => {
    server.getContact(contactId).then(setContact)
    refreshMessages()
  }, [contactId])

  useEffect(() => {
    if (scrollbar.current && !noAutoScroll.current) {
      const { viewport } = scrollbar.current.osInstance().elements()
      viewport.scrollTop = viewport.scrollHeight
    }
    noAutoScroll.current = false
  }, [messages])

  const CONTACT_MENU = 'CHAT_MESSAGE_CONTACT_MENU'
  const { show: showMessageMenu } = useContextMenu({
    id: CONTACT_MENU,
  })

  const handleSendMessage = (message) => {
    setLoading(true)
    server.sendMessage(contactId, message).then(refreshMessages)
  }

  const handleMessageManage = () => {
    setMessageManageVisible(true)
  }

  const handleCloseMessageManage = () => {
    setMessageManageVisible(false)
    refreshMessages()
  }

  const fileInput = useRef(null)
  const handleUploadFile = () => {
    fileInput.current.click()
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    server.uploadFile(file).then((desc) => {
      server.sendMessage(contactId, desc).then(refreshMessages)
    })
  }

  let _messageId = ''
  const handleMessageMenu = (e) => {
    _messageId = Number(e.currentTarget.dataset.id)
    showMessageMenu({ event: e })
  }
  const handleMessageMenuClick = ({ id }) => {
    if (id === 'delete') {
      server.deleteMessage(_messageId).then(() => {
        noAutoScroll.current = true
        refreshMessages()
      })
    }
  }

  return (
    <div className="chat-body col-ctn p-2">
      {contact ? (
        <>
          <div className="header v-center">
            <div>{contact.nickname}</div>
            <div className="ml-auto">
              <i className="i-tabler-dots"></i>
            </div>
          </div>
          <Spin
            wrapperClassName="ctn-body full-spin"
            className="full-ctn"
            spinning={loading}
          >
            <Split
              direction="vertical"
              gutterSize={6}
              sizes={[70, 30]}
              minSize={100}
              className="split full-ctn"
              cursor="/img/row-resize.png"
            >
              <Scrollbar
                options={scrollbarOptions}
                className="full-ctn"
                ref={scrollbar}
              >
                <div className="p-2">
                  {messages.map((d) => (
                    <MessageDisplay
                      key={d.id}
                      message={d}
                      onContextMenu={handleMessageMenu}
                    ></MessageDisplay>
                  ))}
                </div>
              </Scrollbar>
              <div className="border-t">
                <MessageInput
                  onSend={handleSendMessage}
                  tools={() => (
                    <>
                      <i
                        className="i-tabler-message-2"
                        onClick={handleMessageManage}
                      ></i>
                      <i
                        className="i-tabler-photo-scan text-normal"
                        onClick={handleUploadFile}
                      ></i>
                    </>
                  )}
                ></MessageInput>
              </div>
            </Split>
          </Spin>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </>
      ) : (
        <EmptyInfo>
          <i className="i-tabler-message-circle-bolt"></i>
        </EmptyInfo>
      )}

      <Menu id={CONTACT_MENU} style={{ '--contexify-menu-minWidth': '100px' }}>
        <Item id="delete" onClick={handleMessageMenuClick}>
          {t('delete')}
        </Item>
      </Menu>

      {messageManageVisible && (
        <MessageManage
          contactId={contactId}
          onClose={handleCloseMessageManage}
        ></MessageManage>
      )}
    </div>
  )
}
