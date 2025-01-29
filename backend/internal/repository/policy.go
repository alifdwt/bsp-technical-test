package repository

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/database"
	"gorm.io/gorm"
)

type policyRepository struct {
	db *gorm.DB
}

func NewPolicyRepository(db *gorm.DB) *policyRepository {
	return &policyRepository{db}
}

func (r *policyRepository) CreatePolicy(req models.Policy) (*models.Policy, error) {
	db := r.db.Model(&req)

	newPolicyNumber, err := database.GeneratePolicyCode(r.db, "P.001.")
	if err != nil {
		return nil, err
	}

	req.Code = newPolicyNumber

	result := db.Debug().Create(&req)
	if result.Error != nil {
		return nil, result.Error
	}

	return &req, nil
}

func (r *policyRepository) DeletePolicyByCode(code string) error {
	var policy models.Policy
	result := r.db.Where("code = ?", code).Delete(&policy)
	if result.Error != nil {
		return result.Error
	}

	return nil
}
