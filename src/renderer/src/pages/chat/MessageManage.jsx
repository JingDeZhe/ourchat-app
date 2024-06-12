import { localGet, localSet } from '@/utils/main'
import { server } from '@/db/server'
import { Button, Popconfirm, Spin } from 'antd'
import Draggable from 'react-draggable'
import { MessageDisplay } from '@/components/MessageDisplay'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const MessageManage = ({ contactId, onClose }) => {
  const { t } = useTranslation()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const nodeRef = useRef(null)
  const scrollbar = useRef(null)

  useEffect(() => {
    refreshMessages()
  }, [contactId])

  useEffect(() => {
    if (scrollbar.current) {
      const { viewport } = scrollbar.current.osInstance().elements()
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    server.getContact(contactId).then(setContact)
  }, [contactId])

  const refreshMessages = () => {
    setLoading(true)
    server.getMessages(contactId).then((d) => {
      setMessages(d)
      setLoading(false)
    })
  }

  const handleDeleleAllMessages = () => {
    server.deleteAllMessages(contactId).then(() => {
      onClose()
      toast.success(t('successTip'))
    })
  }

  const MESSAGE_MANAGE_POS = 'MESSAGE_MANAGE_POS'
  const defaultPosition = localGet(MESSAGE_MANAGE_POS) || { x: 100, y: 100 }
  const handleStop = (e, data) => {
    localSet(MESSAGE_MANAGE_POS, { x: data.x, y: data.y })
  }

  if (!contact) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      onStop={handleStop}
      grid={[2, 2]}
      defaultPosition={defaultPosition}
      handle=".handle"
    >
      <div className="message-manage full-ctn col-ctn" ref={nodeRef}>
        <i className="close-btn i-tabler-x" onClick={onClose}></i>
        <div className="mb-3 v-center p-2 handle">
          <span>{contact.alias}</span>
        </div>
        <Spin
          wrapperClassName="ctn-body full-spin"
          className="full-ctn"
          spinning={loading}
        >
          <div className="col-ctn p-2">
            <Scrollbar
              options={{
                scrollbars: { autoHide: 'scroll', autoHideDelay: 500 },
              }}
              className="ctn-body"
              ref={scrollbar}
            >
              <div className="py-2 px-4">
                {messages.map((d) => (
                  <MessageDisplay message={d} key={d.id}></MessageDisplay>
                ))}
              </div>
            </Scrollbar>
            <div className="mt-2 pt-2 text-right space-x-2 border-t-(1 zinc-200 solid)">
              <Popconfirm
                icon={null}
                description={t('deleteAllMessagesTip')}
                okText={t('confirm')}
                cancelText={t('cancel')}
                onConfirm={handleDeleleAllMessages}
              >
                <Button danger>{t('deleteAllMessages')}</Button>
              </Popconfirm>
            </div>
          </div>
        </Spin>
      </div>
    </Draggable>
  )
}
