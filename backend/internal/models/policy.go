package models

type Policy struct {
	ID          int     `json:"id" gorm:"primaryKey"`
	Code        string  `json:"code" gorm:"size:50;not null"`
	InvoiceCode string  `json:"invoice_code" gorm:"size:50;not null"`
	Invoice     Invoice `json:"invoice"`
}
