import { createContext, ReactNode, useContext, useEffect } from 'react'
import mixpanel from 'mixpanel-browser'
import useCookie from 'react-use-cookie'
import { v4 as uuid } from 'uuid'
export { mixpanel }

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN
const isBrowser = typeof window !== 'undefined'

if (isBrowser && MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, { debug: import.meta.env.DEV })
}

const MixPanelContext = createContext<typeof mixpanel | null>(null)

export function MixPanelProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useCookie('userId', undefined)
  useEffect(() => {
    if (!MIXPANEL_TOKEN || !isBrowser || userId) return
    const hostname = window.location.host
    setUserId(uuid(), {
      domain: hostname.match(/^localhost/)
        ? 'localhost'
        : hostname.match(/loophole.site$/)
        ? 'loophole.site'
        : 'hearye.com',
      days: 3650,
    })
  }, [userId, setUserId, MIXPANEL_TOKEN])
  useEffect(() => {
    if (!MIXPANEL_TOKEN || !isBrowser || !userId) return
    mixpanel.identify(userId)
  }, [userId, MIXPANEL_TOKEN])
  if (!MIXPANEL_TOKEN) {
    return <>{children}</>
  }
  return (
    <MixPanelContext.Provider value={mixpanel}>
      {children}
    </MixPanelContext.Provider>
  )
}

export function useMixpanel() {
  return useContext(MixPanelContext)
}
