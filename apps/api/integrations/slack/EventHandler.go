package slack

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hearye/hearye/core"
	"github.com/hearye/hearye/persistence"
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
			// persistencePayload := mapInnerEventToAnnouncement(innerEvent)
			// if err := persistence.TriggerAnnouncement(persistencePayload); err != nil {
			// 	fmt.Printf("Error: %s\n", err)
			// 	return http.StatusInternalServerError, ""
			// }
		}
		if err := AcknowledgeAnnouncement(event.InnerEvent); err != nil {
			fmt.Printf("Error: %s\n", err)
		}
		return http.StatusOK, ""
	}

	return 0, ""
}

func shouldTriggerAnnouncement(account persistence.Account, innerEvent slackevents.EventsAPIInnerEvent) bool {
	return innerEvent.Type == string(slackevents.AppMention)
}

// func mapInnerEventToAnnouncement(innerEvent slackevents.EventsAPIInnerEvent) string {
// 	users := extractUsersFromEvent(innerEvent)

// 	return ""
// }

func mapInnerEventToAccount(event slackevents.EventsAPIEvent) core.Account {
	teamInfo, _ := Api().GetTeamInfo()
	return core.Account{
		DisplayName: teamInfo.Name,
		Domain:      teamInfo.Domain,
		ExternalID:  event.TeamID,
		Source:      persistence.Slack,
	}
}
