package models

import "time"

type Invoice struct {
	ID             int         `json:"id" gorm:"primaryKey"`
	Code           string      `json:"code" gorm:"size:50;not null"`
	Period         int         `json:"period" gorm:"not null"`
	InsuredPrice   float32     `json:"insured_price" gorm:"not null"`
	PremiumRate    float32     `json:"premium_rate" gorm:"not null"`
	PremiumBase    float32     `json:"premium_base" gorm:"not null"`
	TransactionFee float32     `json:"transaction_fee" gorm:"not null"`
	Total          float32     `json:"total" gorm:"not null"`
	UserID         int         `json:"user_id" gorm:"not null"`
	User           User        `json:"user"`
	FireProductID  int         `json:"fire_product_id" gorm:"not null;unique"`
	FireProduct    FireProduct `json:"fire_product"`
	CreatedAt      time.Time   `json:"created_at"`
	UpdatedAt      time.Time   `json:"updated_at"`
}
