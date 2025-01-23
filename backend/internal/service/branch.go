package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/branch"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type branchService struct {
	repo repository.BranchRepository
	log  logger.Logger
}

func NewBranchService(repo repository.BranchRepository, log logger.Logger) *branchService {
	return &branchService{
		repo: repo,
		log:  log,
	}
}

func (s *branchService) GetBranchAll() ([]models.Branch, error) {
	branches, err := s.repo.GetBranchAll()
	if err != nil {
		return nil, err
	}

	return *branches, nil
}

func (s *branchService) GetBranchById(id int) (*models.Branch, error) {
	branch, err := s.repo.GetBranchById(id)
	if err != nil {
		return nil, err
	}

	return branch, nil
}

func (s *branchService) CreateBranch(req *branch.CreateBranch) (*models.Branch, error) {
	branch, err := s.repo.CreateBranch(req)
	if err != nil {
		return nil, err
	}

	return branch, nil
}

func (s *branchService) UpdateBranchById(id int, updatedBranch *branch.UpdateBranch) (*models.Branch, error) {
	branch, err := s.repo.UpdateBranchById(id, updatedBranch)
	if err != nil {
		return nil, err
	}

	return branch, nil
}

func (s *branchService) DeleteBranchById(id int) error {
	err := s.repo.DeleteBranchById(id)
	if err != nil {
		return err
	}

	return nil
}
