package models

import "time"

type Policy struct {
	ID          int       `json:"id" gorm:"primaryKey"`
	Code        string    `json:"code" gorm:"size:50;not null"`
	InvoiceCode string    `json:"invoice_code" gorm:"size:50;not null"`
	Invoice     Invoice   `json:"invoice" gorm:"foreignKey:InvoiceCode;references:Code"`
	UserID      int       `json:"user_id" gorm:"not null"`
	User        User      `json:"user"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
