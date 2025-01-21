package postgres

import (
	"fmt"

	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewClient() (*gorm.DB, error) {
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", viper.GetString("PGUSER"), viper.GetString("PGPASSWORD"), viper.GetString("PGHOST"), viper.GetString("PGPORT"), viper.GetString("PGDATABASE"))

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(
		&models.User{},
	)
	if err != nil {
		panic(err)
	}

	return db, nil
}
