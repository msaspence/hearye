import { favicons } from 'favicons'

const source = 'images/icon.png'

export async function getFavIcons({ htmlOnly = false } = {}) {
  return await favicons(source, {
    appName: 'Hear Ye!',
    appShortName: 'Hear Ye!',
    appDescription:
      'Slack app to ensure reaction acknowledgement of important messages and announcements.',
    output: {
      images: !htmlOnly,
      files: !htmlOnly,
      html: true,
    },
    path: '/',
  })
}

export async function getFavIconsHtml() {
  return getFavIcons({ htmlOnly: true })
}
