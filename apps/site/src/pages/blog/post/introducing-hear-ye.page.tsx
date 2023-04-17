import Link from '@mui/material/Link'
import { dayjs } from '@hearye/dayjs'

import { Paragraph } from '../../../components/pages/blog/BlogPost/Paragraph'
import { Heading } from '../../../components/pages/blog/BlogPost/Heading'
import { Note } from '../../../components/pages/blog/BlogPost/Note'
import {
  SummaryPoints,
  SummaryPoint,
} from '../../../components/pages/blog/BlogPost/SummaryPoints'
import { MainFunctionality } from '../../../components/pages/index/Features/MainFunctionality'

import { Pricing } from '../../../components/pages/index/Pricing'
import { Try } from '../../../components/pages/index/Try'

export const title = 'Introducing Hear Ye!'
export const subTitle = 'Never miss an important message again'
export const description =
  'Hear Ye! is a new Slack bot that facilitates collaboration and communication on Slack. It allows message authors to require an acknowledgment from anyone mentioned in the message. The tool sends daily reminders to the intended recipients until they acknowledge the message by reacting with a 👍 emoji. Hear Ye! is especially useful for team leaders and project managers who need to ensure that important information is seen and acted upon. A free beta of Hear Ye is available for all Slack users who want to try it out.'
export const tags = ['product']
export const publishedAt = dayjs('2022-04-10')

export function Page() {
  return (
    <div>
      <SummaryPoints>
        <SummaryPoint>
          A Slack bot that ensures important messages are acknowledged by
          recipients
        </SummaryPoint>
        <SummaryPoint>
          It sends daily reminders until the message is acknowledged with a 👍
          emoji
        </SummaryPoint>
        <SummaryPoint>Free beta is available for Slack users</SummaryPoint>
      </SummaryPoints>

      <Paragraph>
        Introducing Hear Ye - a tool that helps ensure important messages and
        announcements are acknowledged by recipients.
      </Paragraph>
      <Paragraph>
        Have you ever sent an important message to a group of people only to
        realize later that some of them didn't see it or forgot to respond? Or
        have you ever missed an important message because it got lost in the
        noise of your Slack channels? Hear Ye is here to help with that.
      </Paragraph>
      <Heading>How It Works</Heading>
      <Paragraph>
        When you mention the Hear Ye bot in a message and specify the users you
        want to acknowledge it, they will receive daily reminders between 10 and
        11 am* until they acknowledge the message by reacting with a 👍 emoji.
        Once they acknowledge the message, no more reminders will be sent.
      </Paragraph>
      <Note>
        *Reminders are sent based on the recipients timezone settings in slack
      </Note>

      <MainFunctionality />
      <Paragraph>
        Hear Ye is especially useful for team leaders, managers, and anyone who
        needs to ensure that important information is seen and acted upon. With
        Hear Ye, you can rest assured that your message won't be missed, and you
        can work confident that everyone is aligned.
      </Paragraph>
      <Heading>Free Beta</Heading>
      <Paragraph>
        We're excited to offer a free beta of Hear Ye to all Slack users who
        want to try it out. If you're interested in joining the beta, simply{' '}
        <Link href="https://api.hearyebot.com/slack/install">
          install the Hear Ye!
        </Link>{' '}
        bot to your Slack workspace.
      </Paragraph>
      <Paragraph>
        We welcome your{' '}
        <Link href="mailto:hello@hearyebot.com?subject=feedback">
          feedback and suggestions
        </Link>{' '}
        as we continue to develop and improve Hear Ye. Thank you for your
        support, and we look forward to hearing from you soon.
      </Paragraph>
      <Paragraph>The Hear Ye Team</Paragraph>

      <Pricing />
      <Try />
    </div>
  )
}
