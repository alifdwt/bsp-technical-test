package fireproduct

import "github.com/go-playground/validator/v10"

type CreateFireProductRequest struct {
	Period         int     `json:"period" validate:"required"`
	Price          float32 `json:"price" validate:"required"`
	Construction   int     `json:"construction" validate:"required"`
	Address        string  `json:"address" validate:"required"`
	Province       string  `json:"province" validate:"required"`
	City           string  `json:"city" validate:"required"`
	District       string  `json:"district" validate:"required"`
	IsEarthquake   bool    `json:"is_earthquake"`
	BuildingTypeID int     `json:"building_type_id" validate:"required"`
	UserID         int     `json:"user_id"`
}

func (l *CreateFireProductRequest) Validate() error {
	validate := validator.New()

	err := validate.Struct(l)
	if err != nil {
		return err
	}

	return nil
}
