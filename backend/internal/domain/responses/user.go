package responses

import "time"

type UserResponse struct {
	ID              int       `json:"id"`
	Email           string    `json:"email"`
	Username        string    `json:"username"`
	FullName        string    `json:"full_name"`
	ProfileImageURL string    `json:"profile_image_url"`
	BirthDate       time.Time `json:"birth_date"`
}
