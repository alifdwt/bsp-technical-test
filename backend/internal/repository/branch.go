package repository

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/branch"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"gorm.io/gorm"
)

type branchRepository struct {
	db *gorm.DB
}

func NewBranchRepository(db *gorm.DB) *branchRepository {
	return &branchRepository{db}
}

func (r *branchRepository) CreateBranch(req *branch.CreateBranch) (*models.Branch, error) {
	var branch models.Branch

	branch.Code = req.Code
	branch.Name = req.Name

	db := r.db.Model(&branch)

	result := db.Debug().Create(&branch)
	if result.Error != nil {
		return nil, result.Error
	}

	return &branch, nil
}

func (r *branchRepository) GetBranchAll() (*[]models.Branch, error) {
	var branches []models.Branch

	db := r.db.Model(&branches)

	if err := db.Debug().Find(&branches).Error; err != nil {
		return nil, err
	}

	return &branches, nil
}

func (r *branchRepository) GetBranchById(id int) (*models.Branch, error) {
	var branch models.Branch

	db := r.db.Model(&branch)

	checkBranchById := db.Debug().Where("id = ?", id).First(&branch)
	if checkBranchById.Error != nil {
		return nil, checkBranchById.Error
	}

	return &branch, nil
}

func (r *branchRepository) UpdateBranchById(id int, req *branch.UpdateBranch) (*models.Branch, error) {
	var branch models.Branch

	db := r.db.Model(&branch)

	checkBranchById := db.Debug().Where("id = ?", id).First(&branch)
	if checkBranchById.Error != nil {
		return nil, checkBranchById.Error
	}

	branch.Code = req.Code
	branch.Name = req.Name

	result := db.Debug().Updates(&branch)
	if result.Error != nil {
		return nil, result.Error
	}

	return &branch, nil
}

func (r *branchRepository) DeleteBranchById(id int) error {
	var branch models.Branch

	db := r.db.Model(&branch)

	checkBranchById := db.Debug().Where("id = ?", id).First(&branch)
	if checkBranchById.Error != nil {
		return checkBranchById.Error
	}

	result := db.Debug().Delete(&branch)
	if result.Error != nil {
		return result.Error
	}

	return nil
}
