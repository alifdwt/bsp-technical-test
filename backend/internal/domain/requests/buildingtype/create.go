package buildingtype

import "github.com/go-playground/validator/v10"

type CreateBuildingTypeRequest struct {
	Code string  `json:"code" validate:"required"`
	Name string  `json:"name" validate:"required"`
	Rate float32 `json:"rate" validate:"required"`
}

func (l *CreateBuildingTypeRequest) Validate() error {
	validate := validator.New()

	err := validate.Struct(l)
	if err != nil {
		return err
	}

	return nil
}
