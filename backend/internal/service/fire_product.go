package service

import (
	fireproduct "github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/fire_product"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type fireProductService struct {
	repo repository.FireProductRepository
	log  logger.Logger
}

func NewFireProductService(repo repository.FireProductRepository, log logger.Logger) *fireProductService {
	return &fireProductService{
		repo: repo,
		log:  log,
	}
}

func (s *fireProductService) GetFireProductAll() ([]models.FireProduct, error) {
	fireProducts, err := s.repo.GetFireProductAll()
	if err != nil {
		return nil, err
	}

	return *fireProducts, nil
}

func (s *fireProductService) GetFireProductById(id int) (*models.FireProduct, error) {
	fireProduct, err := s.repo.GetFireProductById(id)
	if err != nil {
		return nil, err
	}

	return fireProduct, nil
}

func (s *fireProductService) GetFireProductByUserId(userId int) ([]models.FireProduct, error) {
	fireProducts, err := s.repo.GetFireProductByUserId(userId)
	if err != nil {
		return nil, err
	}

	return *fireProducts, nil
}

func (s *fireProductService) CreateFireProduct(userId int, req fireproduct.CreateFireProductRequest) (*models.FireProduct, error) {
	newReq := &models.FireProduct{
		Period:         req.Period,
		Price:          req.Price,
		Construction:   req.Construction,
		Address:        req.Address,
		Province:       req.Province,
		City:           req.City,
		District:       req.District,
		IsEarthquake:   req.IsEarthquake,
		BuildingTypeID: req.BuildingTypeID,
		UserID:         userId,
	}

	fireProduct, err := s.repo.CreateFireProduct(*newReq)
	if err != nil {
		return nil, err
	}

	return fireProduct, nil
}

func (s *fireProductService) DeleteFireProductById(id int) error {
	err := s.repo.DeleteFireProductById(id)
	if err != nil {
		return err
	}

	return nil
}
