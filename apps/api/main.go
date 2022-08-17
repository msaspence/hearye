package main

import (
	// "encoding/json"
	// "io/ioutil"
	// "net/http"
	// "log"
	// "github.com/slack-go/slack"
	// "github.com/slack-go/slack/slackevents"
	"github.com/gin-gonic/gin"

	"github.com/hearye/hearye/api/integrations/slack"
	"github.com/hearye/hearye/env"
)

func main() {

	env.Load()

	router := gin.Default()

	slack.Mount(router.Group("/slack"))

	err := router.Run(":" + env.GetWithFallback("PORT", "3210"))
	if err != nil {
		panic(err)
	}
}
