package auth

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type RegisterRequest struct {
	Email           string    `json:"email" validate:"required,email"`
	Username        string    `json:"username" validate:"required"`
	FullName        string    `json:"full_name" validate:"required"`
	BirthDate       time.Time `json:"birth_date" validate:"required"`
	ProfileImageURL string    `json:"profile_image_url" validate:"http_url"`
	Password        string    `json:"password" validate:"required,min=6"`
	AdminCode       string    `json:"admin_code"`
}

func (l *RegisterRequest) Validate() error {
	validate := validator.New()

	err := validate.Struct(l)
	if err != nil {
		return err
	}

	return nil
}
