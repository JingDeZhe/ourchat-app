import { server } from '@/db/server'
import { ChatMenu } from './ChatMenu'
import { ChatBody } from './ChatBody'
import { localDel, localGet, localSet } from '@/utils/main'
import { MainLayout } from '@/components/MainLayout'
import { useLoaderData } from 'react-router-dom'
import { useRefresh } from '@/composables/hooks'

export const chatLoader = async ({ params }) => {
  return server.getActiveContacts(params.userId)
}

const LAST_CHAT_ID = 'LAST_CHAT_ID'
export const Chat = () => {
  const refreshPage = useRefresh()
  const contacts = useLoaderData()
  const { state } = useLocation()

  const getLastContactId = () => {
    const id = state?.contactId || localGet(LAST_CHAT_ID)
    if (id) {
      if (contacts.find((d) => d.id === id)) {
        localSet(LAST_CHAT_ID, id)
        return id
      }
      localDel(LAST_CHAT_ID)
    }
    return ''
  }

  const [contactId, setContactId] = useState(getLastContactId)
  const handleSelectContact = (id) => {
    localSet(LAST_CHAT_ID, id)
    setContactId(id)
  }

  return (
    <MainLayout className="chat">
      <ChatMenu
        contacts={contacts}
        contactId={contactId}
        onSelect={handleSelectContact}
        onRefresh={refreshPage}
      ></ChatMenu>
      <ChatBody contactId={contactId}></ChatBody>
    </MainLayout>
  )
}
