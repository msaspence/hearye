package slack

import (
	"net/http"

	"github.com/slack-go/slack"

	"github.com/hearye/hearye/env"
)

func VerifyRequest(header http.Header, body []byte) int {
	signingSecret := env.Get("SLACK_SIGNING_SECRET")

	secretsVerifier, err := slack.NewSecretsVerifier(header, signingSecret)
	if err != nil {
		return http.StatusBadRequest
	}

	if _, err := secretsVerifier.Write(body); err != nil {
		return http.StatusInternalServerError
	}

	if err := secretsVerifier.Ensure(); err != nil {
		return http.StatusUnauthorized
	}

	return 0
}
