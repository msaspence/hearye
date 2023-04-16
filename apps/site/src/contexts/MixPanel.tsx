import { createContext, ReactNode, useContext, useEffect } from 'react'
import mixpanel from 'mixpanel-browser'
import useCookie from 'react-use-cookie'
import { v4 as uuid } from 'uuid'
export { mixpanel }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { debug: true })

const MixPanelContext = createContext<typeof mixpanel | null>(null)

export function MixPanelProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useCookie('userId', undefined)
  useEffect(() => {
    if (!userId) {
      setUserId(uuid(), {
        domain: window.location.host.match(/^localhost/)
          ? 'localhost'
          : window.location.host.match(/loophole.site$/)
          ? 'loophole.site'
          : 'hearye.com',
        days: 3650,
      })
    }
  }, [])
  useEffect(() => {
    if (userId) mixpanel.identify(userId)
  }, [userId])
  return (
    <MixPanelContext.Provider value={mixpanel}>
      {children}
    </MixPanelContext.Provider>
  )
}

export function useMixpanel() {
  return useContext(MixPanelContext)
}
