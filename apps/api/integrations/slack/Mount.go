package slack

import (
	"github.com/gin-gonic/gin"
)

func Mount(group *gin.RouterGroup) {
	group.POST("/events", RequestHandler)
}
