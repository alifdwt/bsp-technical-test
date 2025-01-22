package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/buildingtype"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type buildingTypeService struct {
	repo repository.BuildingTypeRepository
	log  logger.Logger
}

func NewBuildingTypeService(repo repository.BuildingTypeRepository, log logger.Logger) *buildingTypeService {
	return &buildingTypeService{
		repo: repo,
		log:  log,
	}
}

func (s *buildingTypeService) GetBuildingTypeAll() ([]models.BuildingType, error) {
	buildingTypes, err := s.repo.GetBuildingTypeAll()
	if err != nil {
		return nil, err
	}

	return *buildingTypes, nil
}

func (s *buildingTypeService) GetBuildingTypeById(id int) (*models.BuildingType, error) {
	buildingType, err := s.repo.GetBuildingTypeById(id)
	if err != nil {
		return nil, err
	}

	return buildingType, nil
}

func (s *buildingTypeService) CreateBuildingType(req *buildingtype.CreateBuildingTypeRequest) (*models.BuildingType, error) {
	buildingType, err := s.repo.CreateBuildingType(req)
	if err != nil {
		return nil, err
	}

	return buildingType, nil
}

func (s *buildingTypeService) UpdateBuildingTypeById(id int, updatedBuildingType *buildingtype.UpdateBuildingTypeRequest) (*models.BuildingType, error) {
	buildingType, err := s.repo.UpdateBuildingTypeById(id, updatedBuildingType)
	if err != nil {
		return nil, err
	}

	return buildingType, nil
}

func (s *buildingTypeService) DeleteBuildingTypeById(id int) (*models.BuildingType, error) {
	buildingType, err := s.repo.DeleteBuildingTypeById(id)
	if err != nil {
		return nil, err
	}

	return buildingType, nil
}
