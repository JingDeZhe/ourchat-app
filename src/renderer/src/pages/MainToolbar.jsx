import { Button, Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import { upperFirst } from '@/utils/main'

const categories = [
  {
    route: 'chat',
    icon: 'i-tabler-message-circle',
    title: 'chat',
  },
  {
    route: 'contact',
    icon: 'i-tabler-address-book',
    title: 'contact',
  },
  {
    route: 'moment',
    icon: 'i-tabler-circles',
    title: 'moment',
  },
]

export const MainToolbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const [activeModule, setActiveModule] = useState('')

  useEffect(() => {
    const activeCategory = categories.find(
      (d) => location.pathname.indexOf(d.route) !== -1
    )
    setActiveModule(activeCategory?.route || '')
  }, [location])

  const handleSelectModule = (mod) => {
    navigate(`./${mod.route}`)
  }

  const handleSetting = () => {
    navigate('./setting')
  }
  return (
    <div className="main-toolbar">
      {categories.map((d) => {
        return (
          <div
            className={cls('module-item', { active: d.route === activeModule })}
            title={upperFirst(t(d.route))}
            key={d.route}
            onClick={() => handleSelectModule(d)}
          >
            <i className={d.icon}></i>
          </div>
        )
      })}
      <Popover
        placement="rightBottom"
        trigger="click"
        content={() => {
          return (
            <div className="w-[100px]">
              <Button
                type="text"
                block
                onClick={handleSetting}
                className="text-left"
              >
                <i className="i-tabler-settings mr-2"></i>
                {t('setting')}
              </Button>
              <Button
                type="link"
                target="_blank"
                href="https://github.com/JingDeZhe/ourchat"
                block
                className="text-left"
              >
                <i className="i-tabler-brand-github mr-2"></i>
                Github
              </Button>
            </div>
          )
        }}
      >
        <div className="module-item mt-auto">
          <i className="i-tabler-baseline-density-medium"></i>
        </div>
      </Popover>
    </div>
  )
}
