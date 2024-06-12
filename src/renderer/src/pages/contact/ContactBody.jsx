import { Button, Descriptions, Popconfirm, Space } from 'antd'
import { EmptyInfo } from '@/components/EmptyInfo'
import { server } from '@/db/server'
import { RelationEdit } from '@/components/RelationEdit'
import { useTranslation } from 'react-i18next'

export const ContactBody = ({ contactId, onDelete, onRefresh, onChat }) => {
  const { t } = useTranslation()
  const [contact, setContact] = useState()
  const [RelationEditVisible, setRelationEditVisible] = useState(false)

  useEffect(() => {
    server.getContact(contactId).then(setContact)
  }, [contactId])

  const handleDeleleContact = () => {
    onDelete(contact.id)
  }
  const handleEditContact = () => {
    setRelationEditVisible(true)
  }
  const handleRelationEditClosed = () => {
    setRelationEditVisible(false)
    server.getContact(contactId).then(setContact)
    onRefresh()
  }

  return (
    <div className="contact-body">
      {contact ? (
        <>
          <div className="flex gap-3">
            <img src={contact.avatar} className="chat-avatar xl" />
            <Descriptions title={contact.alias} column={1}>
              <Descriptions.Item label="Nickname">
                {contact.nickname}
              </Descriptions.Item>
              <Descriptions.Item label="Username">
                {contact.username}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="p-2">
            <p className="font-bold">{t('character')}</p>
            <div className="text-sm">{contact.character || t('none')}</div>
          </div>
          <Space className="justify-end mt-5">
            <Popconfirm
              icon={null}
              description="Sure to delete the contact?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeleleContact}
            >
              <Button danger>{t('delete')}</Button>
            </Popconfirm>
            <Button onClick={handleEditContact}>{t('edit')}</Button>
            <Button onClick={() => onChat(contactId)}>{t('chat')}</Button>
          </Space>

          {RelationEditVisible && (
            <RelationEdit
              contactId={contactId}
              onClose={handleRelationEditClosed}
            ></RelationEdit>
          )}
        </>
      ) : (
        <EmptyInfo>
          <i className="i-tabler-message-circle-bolt"></i>
        </EmptyInfo>
      )}
    </div>
  )
}
