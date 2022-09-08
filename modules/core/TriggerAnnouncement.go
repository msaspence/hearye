package core

type AnnouncementInput struct {
	Users []UserInput
}

type UserInput struct {
}

func TriggerAnnouncement(payload AnnouncementInput) error {
	return nil
}
