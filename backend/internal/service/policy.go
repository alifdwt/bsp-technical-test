package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/policy"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type policyService struct {
	repo            repository.PolicyRepository
	log             logger.Logger
	fireProductRepo repository.FireProductRepository
}

func NewPolicyService(repo repository.PolicyRepository, log logger.Logger, fireProductRepo repository.FireProductRepository) *policyService {
	return &policyService{
		repo:            repo,
		log:             log,
		fireProductRepo: fireProductRepo,
	}
}

func (s *policyService) CreatePolicy(userId int, req *policy.CreatePolicyRequest) (*models.Policy, error) {
	newPolicy := models.Policy{
		UserID:      userId,
		InvoiceCode: req.InvoiceCode,
	}

	policy, err := s.repo.CreatePolicy(newPolicy)
	if err != nil {
		return nil, err
	}

	err = s.fireProductRepo.SetFireProductPolicyCode(req.InvoiceCode, policy.Code)
	if err != nil {
		return nil, err
	}

	return policy, nil
}

func (s *policyService) DeletePolicyByCode(code string) error {
	err := s.repo.DeletePolicyByCode(code)
	if err != nil {
		return err
	}

	err = s.fireProductRepo.UnsetFireProductPolicyCode(code)
	if err != nil {
		return err
	}

	return nil
}
