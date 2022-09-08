package slack

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hearye/hearye/core"
	"github.com/hearye/hearye/db"
	"github.com/slack-go/slack/slackevents"
)

func EventHandler(event slackevents.EventsAPIEvent) (status int, responseJson string) {

	innerEvent := event.InnerEvent

	switch event.Type {

	case slackevents.URLVerification:
		response, _ := json.Marshal(event)
		return http.StatusOK, string(response)

	case slackevents.CallbackEvent:
		mappedEventForAccount := mapInnerEventToAccount(event)
		account, err := core.GetAccount(mappedEventForAccount)
		if err != nil {
			return http.StatusInternalServerError, ""
		}

		if shouldTriggerAnnouncement(account, innerEvent) {
			dbPayload := mapInnerEventToAnnouncement(event)
			if err := core.TriggerAnnouncement(dbPayload); err != nil {
				fmt.Printf("Error: %s\n", err)
				return http.StatusInternalServerError, ""
			}
		}
		if err := AcknowledgeAnnouncement(event.InnerEvent); err != nil {
			fmt.Printf("Error: %s\n", err)
		}
		return http.StatusOK, ""
	}

	return 0, ""
}

func shouldTriggerAnnouncement(account db.Account, innerEvent slackevents.EventsAPIInnerEvent) bool {
	return innerEvent.Type == string(slackevents.AppMention)
}

func mapInnerEventToAnnouncement(innerEvent slackevents.EventsAPIEvent) core.AnnouncementInput {
	users := extractAudienceFromEvent(innerEvent)

	return core.AnnouncementInput{Users: users}
}

func mapInnerEventToAccount(event slackevents.EventsAPIEvent) core.Account {
	teamInfo, _ := Api().GetTeamInfo()
	return core.Account{
		DisplayName: teamInfo.Name,
		Domain:      teamInfo.Domain,
		ExternalID:  event.TeamID,
		Source:      db.Slack,
	}
}

func extractAudienceFromEvent(event slackevents.EventsAPIEvent) []core.UserInput {
	// var users []string
	// for _, user := range event.Items {
	// 	users = append(users, user.User)
	// }
	if mention, ok := event.InnerEvent.Data.(*slackevents.AppMentionEvent); ok {
		// } else {
		fmt.Printf("EVENT2: %+v\n", mention.Blocks)
		// 	fmt.Printf("NOT EVENT: %+v\n", mention)
	}
	users := []core.UserInput{}
	return users
}
