import Link from '@mui/material/Link'
import { dayjs } from '@hearye/dayjs'

import { Tweet } from '../../../components/Tweet'
import { List, ListItem } from '../../../components/pages/blog/BlogPost/List'
import { Paragraph } from '../../../components/pages/blog/BlogPost/Paragraph'
import { Heading } from '../../../components/pages/blog/BlogPost/Heading'
import {
  SummaryPoints,
  SummaryPoint,
} from '../../../components/pages/blog/BlogPost/SummaryPoints'
import { ChatMention } from 'apps/site/src/components/pages/index/Features/FeatureScreen'

import { Try } from '../../../components/pages/index/Try'

export const title = 'How to Enable Read Receipts in Slack'
export const subTitle = "You Can't, But Here's Something Better"
export const description =
  "Slack doesn't provide Read Receipts. Fear not, Hear Ye! provides an even better solution with message acknowledgements. Find out how to install and use Hear Ye! and how it can help you ensure important messages don't drop through the cracks."
export const tags = ['guide']
export const publishedAt = dayjs('2022-04-17')

export function Page() {
  return (
    <div>
      <SummaryPoints>
        <SummaryPoint>The short answer is you can't.</SummaryPoint>
        <SummaryPoint>
          The longer answer is that we can do you one better.
        </SummaryPoint>
        <SummaryPoint>
          Tired of Important Messages Getting Lost in the Shuffle?
        </SummaryPoint>
        <SummaryPoint>
          <Link href="/">Hear Ye!</Link> provides a way to track and
          automatically prompt for message acknowledgements.
        </SummaryPoint>
      </SummaryPoints>
      <Paragraph>
        If you're like most Slack users, you know how overwhelming the constant
        stream of messages can be. What happens when an important messages fall
        through the cracks?
      </Paragraph>
      <Paragraph>
        Read receipts are one of Slack's most requested features. There are
        tweets going back to at least 2014 asking for it. The responses from
        Slack have slowly gone from "we're looking into this" to "we have no
        plans for read receipts".
      </Paragraph>
      <Tweet tweetId="504326324891430912" />

      <Paragraph>
        Read receipts, which indicate when someone has "read" your message, have
        become a popular feature in messaging apps like WhatsApp and iMessage.
        However, if you're a Slack user, you may have noticed that read receipts
        are not currently available.
      </Paragraph>
      <Heading>We Can Do You One Better</Heading>
      <Paragraph>
        Let's face it: read receipts aren't very helpful. They only confirm that
        a message has appeared on screen, not that the recipient has actually
        read and understood it.
      </Paragraph>
      <Paragraph>
        This is why we built <Link href="/">Hear Ye!</Link>. Hear Ye! is a Slack
        bot that allows you to pick your most important Slack messages and
        ensure that the recipients acknowledge the message with a 👍 reaction.
        By requiring message acknowledgments, you can be sure that your team is
        on the same page and that important information isn't being dropped.
      </Paragraph>

      <Heading>Hear Ye! Hear Ye!</Heading>
      <Paragraph>
        <Link href="/">Hear Ye!</Link> is the ultimate tool for making sure
        those crucial messages don't get lost! It makes it super easy to ensure
        important messages are seen and acknowledged by all the right people. No
        more worrying about whether your message was lost in the sea of Slack
        notifications!
      </Paragraph>
      <Paragraph> Here's how it works:</Paragraph>
      <List ordered>
        <ListItem>
          Mention the Hear Ye! bot in your message, along with the names of the
          people who you want to acknowledge the message.
        </ListItem>
        <ListItem>
          Hear Ye! will send them daily reminders between 10 and 11 am their
          time until they acknowledge it.
        </ListItem>
        <ListItem>
          Once a recipient has acknowledged the message, the reminders will
          cease.
        </ListItem>
      </List>
      <Paragraph>
        We get it, Slack can be overwhelming! But when it comes to the important
        stuff, you want to know that your message has been received loud and
        clear. That's where Hear Ye! comes in, with its magical powers of
        message acknowledgments.
      </Paragraph>
      <Paragraph>
        Hear Ye! is your automated safety net. When things get missed it will
        step in and provide a gentle nudge to get the conversation back on
        track.
      </Paragraph>

      <Heading>Better Than a Read Receipt</Heading>
      <Paragraph>
        <Link href="/">Hear Ye!</Link> offers several advantages over
        traditional read receipts:
      </Paragraph>
      <List>
        <ListItem>
          <strong>Explicit:</strong> A "Read" receipt only confirms the message
          has appeared on screen. Not that the recipient has actually read and
          understood the message.
        </ListItem>
        <ListItem>
          <strong>Focused:</strong> Being expected to read every Slack message
          in detail is an unreasonable expectation for anyone. Tracking read
          receipts on all messages adds more noise, not signal, to the system.
          Hear Ye! focuses on only on those messages that are important enough
          to require an acknowledgment.
        </ListItem>
        <ListItem>
          <strong>Customizable:</strong> Hear Ye! allows you to customize who is
          expected to acknowledge a message. You can target specific people or
          groups who need to be aware of the message.
        </ListItem>
        <ListItem>
          <strong>Automated:</strong> Hear Ye! sends daily reminders to people
          who have not yet acknowledged a message. You don't have to manually
          follow up with each person individually. This saves time and ensures
          that messages don't get overlooked.
        </ListItem>
        <ListItem>
          <strong>Accountability:</strong> Read receipts only tell you if
          someone has seen your message, but they don't guarantee that they have
          taken it onboard. Hear Ye's message acknowledgments ensure that
          everyone who is expected to read the message has acknowledged it,
          providing accountability for everyone involved.
        </ListItem>
      </List>

      <Heading>Installing and Using Hear Ye!</Heading>
      <Paragraph>
        Ready to take <Link href="/">Hear Ye!</Link> for a spin? Just click that
        button below to add it to your Slack workspace! Once it's installed
        simply add to your channel and <ChatMention>@mention</ChatMention> Hear
        Ye! in any message where you want to require an acknowledgement. Easy
        peasy, right?
      </Paragraph>
      <Try sx={{ marginTop: 3, marginBottom: 7 }} />
      <Paragraph>To start using simply:</Paragraph>
      <List ordered>
        <ListItem>
          Add the Hear Ye! bot to any channels you wish to use it in.
        </ListItem>
        <ListItem>
          Mention <ChatMention>@Hear Ye</ChatMention> along with any recipients
          of the message.
        </ListItem>
      </List>

      <Paragraph>
        Hear Ye! offers a more comprehensive and effective solution for
        facilitating message acknowledgments than traditional read receipts. By
        using Hear Ye!, you can ensure that your team is on the same page,
        improve communication, and increase accountability in your Slack
        workspace.
      </Paragraph>
    </div>
  )
}
