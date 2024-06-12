import { Button, Input } from 'antd'
import { server } from '@/db/server'
import PinyinEngine from 'pinyin-engine'
import { scrollbarOptions } from '@/composables/main'
import { useTranslation } from 'react-i18next'

export const RelationManage = ({ fromId }) => {
  const { t } = useTranslation()
  const [users, setUsers] = useState([])
  const [queryText, setQueryText] = useState('')

  const engine = useMemo(() => {
    return new PinyinEngine(users, ['nickname'])
  }, [users])
  const filteredUsers = engine.query(queryText)

  useEffect(() => {
    server.getRelationUsers(fromId).then(setUsers)
  }, [fromId])

  const handleAdd = (targetId) => {
    server.addRelation(fromId, targetId).then(() => {
      setUsers((pre) =>
        pre.map((d) => (d.id === targetId ? { ...d, inRelation: true } : d))
      )
      toast.success(t('successTip'))
    })
  }

  return (
    <div className="relation-manage col-ctn gap-2">
      <div className="mt-2">
        <Input
          placeholder={t('search')}
          value={queryText}
          onInput={(e) => setQueryText(e.target.value)}
        ></Input>
      </div>
      <Scrollbar options={scrollbarOptions} className="ctn-body">
        {filteredUsers.map((d) => (
          <div className="user-info" key={d.id}>
            <img src={d.avatar} className="chat-avatar sm" />
            <span className="flex-1 truncate">{d.nickname}</span>
            {d.inRelation ? (
              <i className="i-tabler-user-check mr-10"></i>
            ) : (
              <Button
                type="text"
                className="mr-5"
                onClick={() => handleAdd(d.id)}
              >
                Add
              </Button>
            )}
          </div>
        ))}
      </Scrollbar>
    </div>
  )
}
