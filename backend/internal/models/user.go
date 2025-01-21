package models

import "time"

type User struct {
	ID              int       `json:"id" gorm:"primaryKey"`
	Username        string    `json:"username" gorm:"size:50;unique;not null"`
	FullName        string    `json:"full_name" gorm:"size:150;not null"`
	Email           string    `json:"email" gorm:"size:150;unique;not null"`
	Password        string    `json:"password" gorm:"type:text;not null"`
	BirthDate       time.Time `json:"birth_date" gorm:"not null"`
	ProfileImageURL string    `json:"profile_image_url"`
	Role            string    `json:"role" gorm:"size:50;default:customer;not null"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}
