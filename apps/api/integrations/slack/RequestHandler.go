package slack

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/slack-go/slack/slackevents"
)

func RequestHandler(context *gin.Context) {
	body, err := io.ReadAll(context.Request.Body)
	// fmt.Printf("BODY: %s\n", body)
	if err != nil {
		context.Status(http.StatusBadRequest)
		return
	}

	if status := VerifyRequest(context.Request.Header, body); status != 0 {
		context.Status(status)
		return
	}

	eventsAPIEvent, err := slackevents.ParseEvent(body, slackevents.OptionNoVerifyToken())
	if err != nil {
		context.Status(http.StatusBadRequest)
		return
	}

	if status, responseJson := EventHandler(eventsAPIEvent); status != 0 {
		context.JSON(status, responseJson)
		return
	}

	context.Status(http.StatusOK)
}
