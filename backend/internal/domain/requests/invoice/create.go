package invoice

import "github.com/go-playground/validator/v10"

type CreateInvoiceRequest struct {
	FireProductID  int     `json:"fire_product_id" validate:"required"`
	Period         int     `json:"period" validate:"required"`
	InsuredPrice   float32 `json:"insured_price" validate:"required"`
	PremiumRate    float32 `json:"premium_rate" validate:"required"`
	PremiumBase    float32 `json:"premium_base" validate:"required"`
	TransactionFee float32 `json:"transaction_fee" validate:"required"`
	Total          float32 `json:"total" validate:"required"`
}

func (l *CreateInvoiceRequest) Validate() error {
	validate := validator.New()

	err := validate.Struct(l)
	if err != nil {
		return err
	}

	return nil
}
