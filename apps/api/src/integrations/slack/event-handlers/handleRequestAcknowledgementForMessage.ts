import { WebClient } from '@slack/web-api'

import { Message } from '../requireAcknowledgementsForMessage'

export async function handleRequestAcknowledgementForMessage(event: {
  ack: () => Promise<void>
  client: WebClient
  payload: { channel: { id: string }; message: Message; trigger_id: string }
}) {
  await event.ack()
  event.client.views.open({
    trigger_id: event.payload.trigger_id,
    view: {
      type: 'modal',
      callback_id: 'require_acknowledgement_for_messagex',
      private_metadata: JSON.stringify({
        message: {
          channel: event.payload.channel.id,
          ts: event.payload.message.ts,
        },
      }),
      title: {
        type: 'plain_text',
        text: 'Require Acknowledgements',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Hear Ye!',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: 'Have Hear Ye! make this message critical & require acknowledgements.',
            emoji: true,
          },
        },
        {
          type: 'input',
          optional: true,
          element: {
            type: 'checkboxes',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Require acknowledgement from users and groups already mentioned in the message',
                  emoji: true,
                },
                value: 'include-mentioned',
              },
            ],
            initial_options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Require acknowledgement from users and groups already mentioned in the message',
                },
                value: 'include-mentioned',
              },
            ],
            action_id: 'options',
          },
          label: {
            type: 'plain_text',
            text: 'Mentioned Users & Groups',
            emoji: true,
          },
        },
        {
          type: 'input',
          optional: true,
          element: {
            type: 'multi_users_select',
            placeholder: {
              type: 'plain_text',
              text: 'Choose additional users that need to acknowledge this message',
              emoji: true,
            },

            action_id: 'other-users',
          },
          label: {
            type: 'plain_text',
            text: 'Other Users',
            emoji: true,
          },
        },
      ],
    },
  })
}
