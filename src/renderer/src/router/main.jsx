import { createHashRouter, redirect } from 'react-router-dom'
import { ErrorPage } from '@/pages/ErrorPage'
import { OurChat } from '@/pages/OurChat'
import { server } from '@/db/server'
import { Chat, chatLoader } from '@/pages/chat/main'
import { Contact, contactLoader } from '@/pages/contact/main'
import { Moment, momentLoader } from '@/pages/moment/main'
import { Setting, settingLoader } from '@/pages/setting/main'
import { SettingAi, settingAiLoader } from '@/pages/setting/SettingAi'
import { SettingCommon, settingCommonLoader } from '@/pages/setting/SettingCommon'
import { isValidAiOptions } from '@/db/ai'

export const router = createHashRouter([
  {
    path: '/',
    errorElement: ErrorPage,
    loader: async ({ params }) => {
      if (!params.userId) {
        const user = await server.getFirstUser()
        if (!isValidAiOptions()) {
          return redirect(`/${user.id}/setting/ai`)
        } else {
          return redirect(`/${user.id}/chat`)
        }
      } else {
        return null
      }
    }
  },
  {
    path: '/:userId',
    element: <OurChat />,
    children: [
      {
        path: 'chat',
        element: <Chat />,
        loader: chatLoader
      },
      {
        path: 'contact',
        element: <Contact />,
        loader: contactLoader
      },
      {
        path: 'moment',
        element: <Moment />,
        loader: momentLoader
      },
      {
        path: 'setting',
        element: <Setting />,
        loader: settingLoader,
        children: [
          {
            path: 'common',
            element: <SettingCommon />,
            loader: settingCommonLoader
          },
          {
            path: 'ai',
            element: <SettingAi />,
            loader: settingAiLoader
          }
        ]
      }
    ]
  }
])
