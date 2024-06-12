import { localGet, localSet } from '@/utils/main'
import { Form, Select, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'
import i18n from '@/i18n'
import { useRefresh } from '@/composables/hooks'
const { Option } = Select

const SETTING_COMMON_KEY = 'SETTING_COMMON_KEY'
export const settingCommonLoader = async () => {
  return localGet(SETTING_COMMON_KEY) || { language: i18n.options.lng }
}

export const SettingCommon = () => {
  const refreshPage = useRefresh()
  const setting = useLoaderData()
  const { i18n, t } = useTranslation()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(setting)
  }, [])

  const handleConfirm = () => {
    const d = form.getFieldsValue()
    localSet(SETTING_COMMON_KEY, d)
    i18n.changeLanguage(d.language)
    refreshPage()
  }
  return (
    <div className="setting-common setting-body">
      <Form
        form={form}
        labelCol={{ flex: '100px' }}
        onFieldsChange={handleConfirm}
      >
        <Form.Item name="language" label={t('language')}>
          <Select>
            <Option value="zh">中文</Option>
            <Option value="en">English</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  )
}
