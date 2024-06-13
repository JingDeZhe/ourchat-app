import { server } from '@/db/server'
import { localDel, localGet, localSet } from '@/utils/main'
import { ContactBody } from './ContactBody'
import { ContactMenu } from './ContactMenu'
import { MainLayout } from '@/components/MainLayout'
import { useLoaderData } from 'react-router-dom'
import { useRefresh } from '@/composables/hooks'

export const contactLoader = async ({ params }) => {
  return server.getContacts(params.userId)
}

const LAST_CONTACT_ID = 'LAST_CONTACT_ID'
export const Contact = () => {
  const refreshPage = useRefresh()
  const navigate = useNavigate()
  const { state } = useLocation()
  const contacts = useLoaderData()

  const getLastContactId = () => {
    const id = state?.contactId || localGet(LAST_CONTACT_ID)
    if (id) {
      if (contacts.find((d) => d.id === id)) {
        localSet(LAST_CONTACT_ID, id)
        return id
      }
      localDel(LAST_CONTACT_ID)
    }
    return ''
  }

  const [contactId, setContactId] = useState(getLastContactId)
  const handleSelectItem = (id) => {
    localSet(LAST_CONTACT_ID, id)
    setContactId(id)
  }

  const handleDeleteContact = (id) => {
    server.deleteRelation(id).then(() => {
      localSet(LAST_CONTACT_ID, '')
      setContactId('')
      refreshPage()
    })
  }

  const handleChat = (contactId) => {
    server.activeContact(contactId).then(() => {
      navigate('../chat', { state: { contactId } })
    })
  }

  return (
    <MainLayout>
      <ContactMenu
        contacts={contacts}
        contactId={contactId}
        onSelect={handleSelectItem}
        onDelete={handleDeleteContact}
        onRefresh={refreshPage}
        onChat={handleChat}
      ></ContactMenu>
      <ContactBody
        contactId={contactId}
        onDelete={handleDeleteContact}
        onRefresh={refreshPage}
        onChat={handleChat}
      ></ContactBody>
    </MainLayout>
  )
}
