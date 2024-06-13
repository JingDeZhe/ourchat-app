import { ConfigProvider } from 'antd'
import { MainToolbar } from './MainToolbar'
import { AppToolbar } from './AppToolbar'

export const OurChat = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            titleMarginBottom: '0.5rem',
            itemPaddingBottom: '0.2rem'
          }
        }
      }}
    >
      <div className="ourchat-ctn" onContextMenu={(e) => e.preventDefault()}>
        <div className="ourchat">
          <MainToolbar></MainToolbar>
          <div className="full-ctn col-ctn">
            <AppToolbar></AppToolbar>
            <div className="ctn-body">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
