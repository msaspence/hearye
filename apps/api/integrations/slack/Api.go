package slack

import (
	"github.com/hearye/hearye/env"
	"github.com/slack-go/slack"
	"sync"
)

var lock = &sync.Mutex{}

var api *slack.Client

func Api() *slack.Client {
	lock.Lock()
	defer lock.Unlock()

	if api == nil {
		api = slack.New(env.Get("SLACK_BOT_TOKEN"))
	}
	return api
}
