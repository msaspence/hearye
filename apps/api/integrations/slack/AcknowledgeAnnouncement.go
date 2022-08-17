package slack

import (
	"github.com/slack-go/slack"
	"github.com/slack-go/slack/slackevents"
)

func AcknowledgeAnnouncement(innerEvent slackevents.EventsAPIInnerEvent) error {
	api = Api()
	switch event := innerEvent.Data.(type) {
	case *slackevents.AppMentionEvent:
		// firstBlock := event.Blocks.BlockSet[0]
		// jsonB, _ := json.Marshal(firstBlock)
		// fmt.Printf("BLOCK: %v\n", string(jsonB))
		// richBlock, ok := firstBlock.(*slack.RichTextBlock)
		// fmt.Printf("firstBlock: %v\n%v\n", firstBlock, ok)
		// if ok {
		// jsonB, _ := json.Marshal(richBlock.Elements)
		// fmt.Printf("ELEMENT: %v\n", string(jsonB))
		// }

		ref := slack.NewRefToMessage(event.Channel, event.TimeStamp)
		if err := api.AddReaction("mega", ref); err != nil {
			return err
		}
	}
	return nil
}
