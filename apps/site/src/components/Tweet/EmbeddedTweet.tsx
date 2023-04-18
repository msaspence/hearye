import React, { useRef, useState, useEffect } from 'react'
const { default: script } =
  typeof document !== 'undefined' ? await import('scriptjs') : {}

export function EmbeddedTweet(props) {
  const ref = useRef(null)
  const [loading, setLoading] = useState(true)
  const methodName$5 = 'createTweet'
  const twitterWidgetJs = 'https://platform.twitter.com/widgets.js'

  useEffect(() => {
    let isComponentMounted = true
    if (!script) return
    script(twitterWidgetJs, 'twitter-embed', function () {
      if (!window.twttr) {
        // eslint-disable-next-line no-console
        console.error('Failure to load window.twttr, aborting load')
        return
      }

      if (isComponentMounted) {
        if (!window.twttr.widgets[methodName$5]) {
          // eslint-disable-next-line no-console
          console.error(
            `Method ${methodName$5} is not present anymore in twttr.widget api`
          )
          return
        }

        window.twttr.widgets[methodName$5](
          props.tweetId,
          ref === null || ref === void 0 ? void 0 : ref.current,
          props.options
        ).then(function (element) {
          setLoading(false)

          if (props.onLoad) {
            props.onLoad(element)
          }
        })
      }
    })
    return function () {
      isComponentMounted = false
    }
  }, [])
  return React.createElement(
    React.Fragment,
    null,
    loading && React.createElement(React.Fragment, null, props.placeholder),
    React.createElement('div', {
      ref: ref,
    })
  )
}
