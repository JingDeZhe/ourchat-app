import { Button, Input, Modal } from 'antd'
import PinyinEngine from 'pinyin-engine'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { RelationManage } from '@/components/RelationManage'
import { server } from '@/db/server'
import { toast } from 'react-toastify'
import { scrollbarOptions } from '@/composables/main'
import { useTranslation } from 'react-i18next'

export const ContactMenu = ({
  contacts,
  contactId,
  onSelect,
  onDelete,
  onRefresh,
  onChat,
}) => {
  const { t } = useTranslation()
  const { userId } = useParams()
  const [queryText, setQueryText] = useState('')
  const [relationManageVisible, setRelationManageVisible] = useState(false)

  const engine = useMemo(() => {
    return new PinyinEngine(contacts, ['nickname'])
  }, [contacts])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredContacts = engine.query(queryText)

  const CONTACT_MENU = 'ADDRESS_CONTACT_MENU'
  const { show: showContactMenu } = useContextMenu({
    id: CONTACT_MENU,
  })
  let _menuId = ''
  const handleContactMenu = (e) => {
    _menuId = Number(e.currentTarget.dataset.id)
    showContactMenu({ event: e })
  }
  const handleContactMenuClick = ({ id }) => {
    if (id === 'chat') {
      onSelect(_menuId)
      onChat(_menuId)
    } else if (id === 'pat') {
      server.getRelation(_menuId).then(({ targetId }) => {
        server.fakeAddMoment(targetId).then(() => {
          toast.info('👏')
        })
      })
    } else if (id === 'delete') {
      onDelete(_menuId)
    }
  }
  return (
    <div className="contact-menu col-ctn border-r">
      <div className="header">
        <Input value={queryText} onInput={handleQuery}></Input>
        <Button onClick={() => setRelationManageVisible(true)}>
          <i className="i-tabler-user-plus"></i>
        </Button>
      </div>
      <Scrollbar className="ctn-body" options={scrollbarOptions} defer>
        {filteredContacts.map((d) => {
          return (
            <div
              className={cls('user-info', {
                active: contactId === d.id,
              })}
              key={d.id}
              onClick={() => onSelect(d.id)}
              onContextMenu={handleContactMenu}
              data-id={d.id}
            >
              <img className="chat-avatar" src={d.avatar} />
              <span className="flex-1 truncate">{d.alias}</span>
            </div>
          )
        })}
      </Scrollbar>

      <Menu id={CONTACT_MENU} style={{ '--contexify-menu-minWidth': '120px' }}>
        <Item id="chat" onClick={handleContactMenuClick}>
          {t('chat')}
        </Item>
        <Item id="pat" onClick={handleContactMenuClick}>
          {t('pat')}
        </Item>
        <Item id="delete" onClick={handleContactMenuClick}>
          {t('delete')}
        </Item>
      </Menu>

      <Modal
        title={t('addContact')}
        open={relationManageVisible}
        onCancel={() => setRelationManageVisible(false)}
        afterClose={onRefresh}
        footer={null}
      >
        <RelationManage fromId={userId}></RelationManage>
      </Modal>
    </div>
  )
}
