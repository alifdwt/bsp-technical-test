package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/mapper"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type userService struct {
	repository repository.UserRepository
	log        logger.Logger
	mapper     mapper.UserMapping
}

func NewUserService(repository repository.UserRepository, log logger.Logger, mapper mapper.UserMapping) *userService {
	return &userService{
		repository: repository,
		log:        log,
		mapper:     mapper,
	}
}

func (s *userService) GetUserAll() (*[]responses.UserResponse, error) {
	res, err := s.repository.GetUserAll()
	if err != nil {
		return nil, err
	}

	mapper := s.mapper.ToUserResponses(res)

	return &mapper, nil
}

func (s *userService) GetUserById(id int) (*responses.UserResponse, error) {
	res, err := s.repository.GetUserById(id)
	if err != nil {
		return nil, err
	}

	mapper := s.mapper.ToUserResponse(res)

	return mapper, nil
}

func (s *userService) GetUserByUsername(username string) (*responses.UserResponse, error) {
	res, err := s.repository.GetUserByUsername(username)
	if err != nil {
		return nil, err
	}

	mapper := s.mapper.ToUserResponse(res)

	return mapper, nil
}
