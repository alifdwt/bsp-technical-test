package repository

import (
	"errors"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/buildingtype"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"gorm.io/gorm"
)

type buildingTypeRepository struct {
	db *gorm.DB
}

func NewBuildingTypeRepository(db *gorm.DB) *buildingTypeRepository {
	return &buildingTypeRepository{db}
}

func (r *buildingTypeRepository) CreateBuildingType(req *buildingtype.CreateBuildingTypeRequest) (*models.BuildingType, error) {
	var buildingType models.BuildingType

	buildingType.Code = req.Code
	buildingType.Name = req.Name
	buildingType.Rate = req.Rate

	db := r.db.Model(&buildingType)

	result := db.Debug().Create(&buildingType)
	if result.Error != nil {
		return nil, result.Error
	}

	return &buildingType, nil
}

func (r *buildingTypeRepository) GetBuildingTypeAll() (*[]models.BuildingType, error) {
	var buildingTypes []models.BuildingType

	db := r.db.Model(&buildingTypes)

	if err := db.Debug().Find(&buildingTypes).Error; err != nil {
		return nil, err
	}

	return &buildingTypes, nil
}

func (r *buildingTypeRepository) GetBuildingTypeById(id int) (*models.BuildingType, error) {
	var buildingType models.BuildingType

	db := r.db.Model(&buildingType)

	checkBuildingTypeById := db.Debug().Where("id = ?", id).First(&buildingType)
	if checkBuildingTypeById.Error != nil {
		return nil, checkBuildingTypeById.Error
	}

	return &buildingType, nil
}

func (r *buildingTypeRepository) UpdateBuildingTypeById(id int, updatedBuildingType *buildingtype.UpdateBuildingTypeRequest) (*models.BuildingType, error) {
	var buildingType models.BuildingType

	db := r.db.Model(&buildingType)

	checkBuildingTypeById := db.Debug().Where("id = ?", id).First(&buildingType)
	if checkBuildingTypeById.Error != nil {
		return nil, checkBuildingTypeById.Error
	}

	buildingType.Code = updatedBuildingType.Code
	buildingType.Name = updatedBuildingType.Name
	buildingType.Rate = updatedBuildingType.Rate

	updateBuildingType := db.Debug().Updates(&buildingType)
	if updateBuildingType.Error != nil {
		return nil, updateBuildingType.Error
	}

	return &buildingType, nil
}

func (r *buildingTypeRepository) DeleteBuildingTypeById(id int) (*models.BuildingType, error) {
	var buildingType models.BuildingType

	db := r.db.Model(&buildingType)

	res, err := r.GetBuildingTypeById(id)
	if err != nil {
		return nil, err
	}

	if err := db.Delete(&res).Error; err != nil {
		return nil, errors.New("error while deleting building type: " + err.Error())
	}

	return res, nil
}
