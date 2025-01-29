package policy

import "github.com/go-playground/validator/v10"

type CreatePolicyRequest struct {
	InvoiceCode string `json:"invoice_code" validate:"required"`
}

func (l *CreatePolicyRequest) Validate() error {
	validate := validator.New()

	err := validate.Struct(l)
	if err != nil {
		return err
	}

	return nil
}
