package models

import "time"

type FireProduct struct {
	ID             int          `json:"id" gorm:"primaryKey"`
	Period         int          `json:"period" gorm:"not null"`
	Price          float32      `json:"price" gorm:"not null"`
	Construction   int          `json:"construction" gorm:"not null"`
	Address        string       `json:"address" gorm:"size:255;not null"`
	Province       string       `json:"province" gorm:"size:50;not null"`
	City           string       `json:"city" gorm:"size:50;not null"`
	District       string       `json:"district" gorm:"size:50;not null"`
	IsEarthquake   bool         `json:"is_earthquake" gorm:"not null"`
	BuildingTypeID int          `json:"building_type_id" gorm:"not null"`
	BuildingType   BuildingType `json:"building_type"`
	UserID         int          `json:"user_id" gorm:"not null"`
	User           User         `json:"user"`
	InvoiceCode    string       `json:"invoice_code" gorm:"size:50"`
	PolicyCode     string       `json:"policy_code" gorm:"size:50"`
	CreatedAt      time.Time    `json:"created_at"`
	UpdatedAt      time.Time    `json:"updated_at"`
}
