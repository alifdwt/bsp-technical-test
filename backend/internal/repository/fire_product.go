package repository

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"gorm.io/gorm"
)

type fireProductRepository struct {
	db *gorm.DB
}

func NewFireProductRepository(db *gorm.DB) *fireProductRepository {
	return &fireProductRepository{db}
}

func (r *fireProductRepository) CreateFireProduct(req models.FireProduct) (*models.FireProduct, error) {
	db := r.db.Model(&req)

	result := db.Debug().Create(&req)
	if result.Error != nil {
		return nil, result.Error
	}

	return &req, nil
}

func (r *fireProductRepository) GetFireProductAll() (*[]models.FireProduct, error) {
	var fireProducts []models.FireProduct

	db := r.db.Model(&fireProducts)

	if err := db.Debug().Preload("BuildingType").Preload("User").Find(&fireProducts).Error; err != nil {
		return nil, err
	}

	return &fireProducts, nil
}

func (r *fireProductRepository) GetFireProductById(id int) (*models.FireProduct, error) {
	var fireProduct models.FireProduct

	db := r.db.Model(&fireProduct)

	checkFireProductById := db.Debug().Where("id = ?", id).Preload("BuildingType").Preload("User").First(&fireProduct)
	if checkFireProductById.Error != nil {
		return nil, checkFireProductById.Error
	}

	return &fireProduct, nil
}

func (r *fireProductRepository) GetFireProductByUserId(id int) (*[]models.FireProduct, error) {
	var fireProducts []models.FireProduct

	db := r.db.Model(&fireProducts)

	if err := db.Debug().Where("user_id = ?", id).Preload("BuildingType").Preload("User").Find(&fireProducts).Error; err != nil {
		return nil, err
	}

	return &fireProducts, nil
}

func (r *fireProductRepository) UpdateFireProductById(id int, updatedFireProduct models.FireProduct) (*models.FireProduct, error) {
	var fireProduct models.FireProduct

	db := r.db.Model(&fireProduct)

	checkFireProductById := db.Debug().Where("id = ?", id).First(&fireProduct)
	if checkFireProductById.Error != nil {
		return nil, checkFireProductById.Error
	}

	db = db.Model(&fireProduct).Updates(&updatedFireProduct)
	if db.Error != nil {
		return nil, db.Error
	}

	return &fireProduct, nil
}

func (r *fireProductRepository) DeleteFireProductById(id int) error {
	var fireProduct models.FireProduct

	db := r.db.Model(&fireProduct)

	checkFireProductById := db.Debug().Where("id = ?", id).First(&fireProduct)
	if checkFireProductById.Error != nil {
		return checkFireProductById.Error
	}

	db = db.Delete(&fireProduct)
	if db.Error != nil {
		return db.Error
	}

	return nil
}
