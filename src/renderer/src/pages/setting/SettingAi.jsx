import { useRefresh } from '@/composables/hooks'
import { AI_TYPES, getAiOptions, getEnvAiKey, isValidAiOptions, setAiOptions } from '@/db/ai'
import { Form, Input, Select, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'
const { Option } = Select

export const settingAiLoader = async () => {
  return {}
}

export const SettingAi = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  useEffect(() => {
    if (!isValidAiOptions()) {
      toast(i18n.t('ai.noOptionsTip'), {
        type: 'info',
        theme: 'colored',
        autoClose: 2000
      })
    }
    form.setFieldsValue(getAiOptions())
  }, [])

  const handleConfirm = (d) => {
    setAiOptions(d)
    toast.success(t('successTip'))
  }

  const handleFieldsChange = () => {
    const type = form.getFieldValue('type')
    const envKey = getEnvAiKey(type)
    envKey && form.setFieldValue('key', envKey)
  }

  return (
    <div className="setting-ai setting-body">
      <Form form={form} labelCol={{ flex: '100px' }} onFinish={handleConfirm} onFieldsChange={handleFieldsChange}>
        <Form.Item name="type" label={t('type')}>
          <Select>
            <Option value={AI_TYPES.QWEN}>{t('ai.qwen')}</Option>
            <Option value={AI_TYPES.MOONSHOT}>{t('ai.moonshot')}</Option>
            <Option value={AI_TYPES.ZHIPU}>{t('ai.zhipu')}</Option>
          </Select>
        </Form.Item>
        <Form.Item name="key" label="API Key">
          <Input />
        </Form.Item>

        <div className="text-right">
          <Button htmlType="submit">{t('confirm')}</Button>
        </div>
      </Form>
      <Card title="注意" className="mt-5" size="small">
        <ol>
          <li>
            {t('ai.qwenRefer')}
            <Button
              size="small"
              type="link"
              href="https://help.aliyun.com/zh/dashscope/developer-reference/api-details"
              target="_blank"
            >
              {t('ai.qwen')}
            </Button>
          </li>
          <li>
            {t('ai.moonshotRefer')}
            <Button size="small" type="link" href="https://platform.moonshot.cn/docs/intro" target="_blank">
              {t('ai.moonshot')}
            </Button>
          </li>
          <li>
            {t('ai.zhipuRefer')}
            <Button size="small" type="link" href="https://maas.aminer.cn/dev/api#sdk_install" target="_blank">
              {t('ai.zhipu')}
            </Button>
          </li>
          <li>{t('ai.envTip')}</li>
        </ol>
      </Card>
    </div>
  )
}
