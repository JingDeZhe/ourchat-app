import { useRefresh } from '@/composables/hooks'
import {
  TYPE_MOONSHOT,
  TYPE_QWEN,
  TYPE_ZHIPU,
  getAiOptions,
  isValidAiOptions,
  setAiOptions,
} from '@/db/ai'
import { Form, Input, Select, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'
const { Option } = Select

export const settingAiLoader = async () => {
  return getAiOptions()
}

export const SettingAi = () => {
  const refreshPage = useRefresh()

  const { t } = useTranslation()
  const setting = useLoaderData()
  const [form] = Form.useForm()
  const type = Form.useWatch('type', form)
  const urlType = type === TYPE_QWEN

  useEffect(() => {
    if (!isValidAiOptions()) {
      toast(i18n.t('ai.noOptionsTip'), {
        type: 'info',
        theme: 'colored',
        autoClose: 2000,
      })
    }
    form.setFieldsValue(setting)
  }, [])

  const handleConfirm = (d) => {
    setAiOptions(d)
    toast.success(t('successTip'))
    refreshPage()
  }

  return (
    <div className="setting-ai setting-body">
      <Form form={form} labelCol={{ flex: '100px' }} onFinish={handleConfirm}>
        <Form.Item name="type" label={t('type')}>
          <Select>
            <Option value={TYPE_QWEN}>{t('ai.qwen')}</Option>
            <Option value={TYPE_MOONSHOT}>{t('ai.moonshot')}</Option>
            <Option value={TYPE_ZHIPU}>{t('ai.zhipu')}</Option>
          </Select>
        </Form.Item>
        <Form.Item name="url" label="API URL">
          <Input disabled={!urlType} />
        </Form.Item>
        <Form.Item name="key" label="API Key">
          <Input disabled={urlType} />
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
            <Button
              size="small"
              type="link"
              href="https://platform.moonshot.cn/docs/intro"
              target="_blank"
            >
              {t('ai.moonshot')}
            </Button>
          </li>
          <li>
            {t('ai.zhipuRefer')}
            <Button
              size="small"
              type="link"
              href="https://maas.aminer.cn/dev/api#sdk_install"
              target="_blank"
            >
              {t('ai.zhipu')}
            </Button>
          </li>
          <li>
            <span>{t('ai.qwenTip')}</span>
            <Button
              size="small"
              type="link"
              href="https://github.com/JingDeZhe/xiazhi-server"
              target="_blank"
            >
              xiazhi-server
            </Button>
          </li>
          <li>{t('ai.moonshotTip')}</li>
          <li>{t('ai.zhipuTip')}</li>
        </ol>
      </Card>
    </div>
  )
}
