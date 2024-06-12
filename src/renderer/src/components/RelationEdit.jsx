import { localGet, localSet } from '@/utils/main'
import { server } from '@/db/server'
import { Button, Input } from 'antd'
import Draggable from 'react-draggable'
import { useTranslation } from 'react-i18next'

export const RelationEdit = ({ contactId, onClose }) => {
  const { t } = useTranslation()
  const [relation, setRelation] = useState(null)
  const nodeRef = useRef(null)

  useEffect(() => {
    server.getRelation(contactId).then(setRelation)
  }, [contactId])

  const handleConfirm = () => {
    server.setRelation(relation.id, relation).then(() => {
      onClose()
      toast.success(t('successTip'))
    })
  }

  const EDIT_RELATION_POS = 'EDIT_RELATION_POS'
  const defaultPosition = localGet(EDIT_RELATION_POS) || { x: 100, y: 100 }
  const handleStop = (e, data) => {
    localSet(EDIT_RELATION_POS, { x: data.x, y: data.y })
  }

  if (!relation) return <></>

  return (
    <Draggable
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={defaultPosition}
      grid={[2, 2]}
      handle=".handle"
    >
      <div className="relation-edit w-[400px]" ref={nodeRef}>
        <i className="close-btn i-tabler-x" onClick={onClose}></i>
        <div className="mb-3 v-center p-2 handle">
          <span>{relation.alias}</span>
        </div>
        <div className="p-2">
          <Input.TextArea
            value={relation.character}
            rows={6}
            onInput={(e) =>
              setRelation({ ...relation, character: e.target.value })
            }
          ></Input.TextArea>
          <div className="mt-2 text-right space-x-2">
            <Button onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
