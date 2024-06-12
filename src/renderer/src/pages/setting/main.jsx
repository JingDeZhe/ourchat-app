import { ConfigProvider, Menu } from 'antd'
import { useTranslation } from 'react-i18next'

export const settingLoader = () => {
  return {}
}

export const Setting = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeModule, setActiveModule] = useState()
  const menuItems = [
    {
      key: 'common',
      label: t('common'),
      icon: <i className="i-tabler-dumpling" />,
    },
    {
      key: 'ai',
      label: t('ai.label'),
      icon: <i className="i-tabler-robot-face" />,
    },
  ]

  useEffect(() => {
    const activeCategory = menuItems.find(
      (d) => location.pathname.indexOf(d.key) !== -1
    )
    setActiveModule(activeCategory?.key || '')
  }, [location])

  const handleSelectMenu = ({ key }) => {
    navigate(`./${key}`)
  }

  return (
    <div className="main-setting flex">
      <div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemBorderRadius: 0,
                itemActiveBg: '#f9bb77',
                itemSelectedColor: '#f97316',
                itemSelectedBg: '#f2f2f2',
                itemBg: '#f2f2f2',
              },
            },
          }}
        >
          <Menu
            style={{ width: 200, height: '100%' }}
            items={menuItems}
            selectedKeys={[activeModule]}
            onClick={handleSelectMenu}
          ></Menu>
        </ConfigProvider>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
