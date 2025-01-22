package models

type BuildingType struct {
	ID   int     `json:"id" gorm:"primaryKey"`
	Code string  `json:"code" gorm:"size:50;unique;not null"`
	Name string  `json:"name" gorm:"size:50;unique;not null"`
	Rate float32 `json:"rate" gorm:"not null"`
}
