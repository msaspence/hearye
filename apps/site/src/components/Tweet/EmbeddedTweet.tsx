import React, { useRef, useState, useEffect, ReactNode } from 'react'
const { default: script } =
  typeof document !== 'undefined' ? await import('scriptjs') : { default: null }

export function EmbeddedTweet(props: {
  tweetId: string
  placeholder?: ReactNode
}) {
  const ref = useRef(null)
  const [loading, setLoading] = useState(true)
  const methodName$5 = 'createTweet'
  const twitterWidgetJs = 'https://platform.twitter.com/widgets.js'

  useEffect(() => {
    let isComponentMounted = true
    if (!script) return
    script(twitterWidgetJs, 'twitter-embed', function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.twttr) {
        // eslint-disable-next-line no-console
        console.error('Failure to load window.twttr, aborting load')
        return
      }

      if (isComponentMounted) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!window.twttr.widgets[methodName$5]) {
          // eslint-disable-next-line no-console
          console.error(
            `Method ${methodName$5} is not present anymore in twttr.widget api`
          )
          return
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.twttr.widgets[methodName$5](
          props.tweetId,
          ref === null || ref === void 0 ? void 0 : ref.current,
          {}
        ).then(() => {
          setLoading(false)
        })
      }
    })
    return function () {
      isComponentMounted = false
    }
  }, [])
  return (
    <>
      {loading && <>{props.placeholder}</>}
      <div ref={ref} />
    </>
  )
}
