import { ConfigProvider } from 'antd'
import { MainToolbar } from './MainToolbar'
import { AppToolbar } from './AppToolbar'
import { useTranslation } from 'react-i18next'
import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'

export const OurChat = () => {
  const { i18n } = useTranslation()
  return (
    <ConfigProvider
      locale={i18n.language === 'zh' ? zhCN : enUS}
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
