import { ConfigProvider } from 'antd'
import { MainToolbar } from './MainToolbar'

export const OurChat = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            titleMarginBottom: '0.5rem',
            itemPaddingBottom: '0.2rem',
          },
        },
      }}
    >
      <div className="ourchat-ctn" onContextMenu={(e) => e.preventDefault()}>
        <div className="ourchat">
          <MainToolbar></MainToolbar>
          <Outlet></Outlet>
        </div>
      </div>
    </ConfigProvider>
  )
}
