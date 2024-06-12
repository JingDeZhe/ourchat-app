import { MomentDisplay } from '@/components/MomentDisplay'
import { server } from '@/db/server'
import { scrollbarOptions } from '@/composables/main'
import { useLoaderData } from 'react-router-dom'

export const momentLoader = ({ params }) => {
  return server.getMoments(params.userId)
}

export const Moment = () => {
  const moments = useLoaderData()

  return (
    <div className="moment col-ctn">
      <div className="moment-header"></div>
      <Scrollbar options={scrollbarOptions} className="ctn-body">
        <div className="moment-body">
          {moments.map((d) => (
            <MomentDisplay key={d.id} moment={d}></MomentDisplay>
          ))}
        </div>
      </Scrollbar>
    </div>
  )
}
