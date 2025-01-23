package branch

import "github.com/go-playground/validator/v10"

type CreateBranch struct {
	Code string `json:"code" validate:"required"`
	Name string `json:"name" validate:"required"`
}

func (l *CreateBranch) Validate() error {
	validate := validator.New()

	err := validate.Struct(l)
	if err != nil {
		return err
	}

	return nil
}
