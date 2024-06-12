import { MessageDisplay } from '@/components/MessageDisplay'

export const MomentDisplay = ({ moment }) => {
  const { fromId, content } = moment
  return (
    <div className="moment-display">
      <div></div>
      <MessageDisplay
        message={{ type: 'moment', content, fromId }}
      ></MessageDisplay>
    </div>
  )
}
