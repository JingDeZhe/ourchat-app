import { Input } from 'antd'
import PinyinEngine from 'pinyin-engine'
import { Menu, Item, useContextMenu } from 'react-contexify'
import { server } from '@/db/server'
import { useNavigate } from 'react-router-dom'
import { scrollbarOptions } from '@/composables/main'
import { useTranslation } from 'react-i18next'

export const ChatMenu = ({ contacts, contactId, onSelect, onRefresh }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [queryText, setQueryText] = useState('')

  const engine = useMemo(() => {
    return new PinyinEngine(contacts, ['alias'])
  }, [contacts])
  const handleQuery = (e) => {
    setQueryText(e.target.value)
  }
  const filteredContacts = engine.query(queryText)

  const CONTACT_MENU = 'CHAT_CONTACT_MENU'
  const { show: showContactMenu } = useContextMenu({
    id: CONTACT_MENU,
  })
  let _menuId = ''
  const handleContactMenu = (e) => {
    _menuId = Number(e.currentTarget.dataset.id)
    showContactMenu({ event: e })
  }
  const handleContactMenuClick = ({ id }) => {
    if (id === 'hide') {
      server.deactiveContact(_menuId).then(onRefresh)
    } else if (id === 'info') {
      navigate('../contact', { state: { contactId: _menuId } })
    }
  }

  return (
    <div className="chat-menu col-ctn border-r">
      <div className="header">
        <Input
          value={queryText}
          onInput={handleQuery}
          placeholder={t('search')}
        ></Input>
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
              <span className="flex-1 truncate">{d.nickname}</span>
            </div>
          )
        })}
      </Scrollbar>

      <Menu id={CONTACT_MENU} style={{ '--contexify-menu-minWidth': '120px' }}>
        <Item id="hide" onClick={handleContactMenuClick}>
          {t('hide')}
        </Item>
        <Item id="info" onClick={handleContactMenuClick}>
          {t('info')}
        </Item>
      </Menu>
    </div>
  )
}
