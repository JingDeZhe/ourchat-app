import { localGet, localSet } from '@/utils/main'
import Split from 'react-split'

export const MainLayout = (props) => {
  const MAIN_LAYOUT_SIZES = 'MAIN_LAYOUT_SIZES'
  const defaultSizes = localGet(MAIN_LAYOUT_SIZES) || [30, 70]

  return (
    <Split
      direction="horizontal"
      gutterSize={6}
      sizes={defaultSizes}
      minSize={260}
      snapOffset={5}
      className={cls('flex full-ctn border-r split', props.className)}
      cursor="/img/col-resize.png"
      onDragEnd={(sizes) => localSet(MAIN_LAYOUT_SIZES, sizes)}
    >
      {props.children}
    </Split>
  )
}
