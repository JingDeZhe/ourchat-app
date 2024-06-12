import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
  const { t } = useTranslation()
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page" className="full-ctn all-center">
      <p>{t('routerErrorMsg')}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
