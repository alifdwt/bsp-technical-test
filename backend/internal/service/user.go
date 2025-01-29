package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/user"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/mapper"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/hashing"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type userService struct {
	repository repository.UserRepository
	log        logger.Logger
	mapper     mapper.UserMapping
	hash       hashing.Hashing
}

func NewUserService(repository repository.UserRepository, log logger.Logger, mapper mapper.UserMapping, hash hashing.Hashing) *userService {
	return &userService{
		repository: repository,
		log:        log,
		mapper:     mapper,
		hash:       hash,
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

func (s *userService) UpdateUserById(id int, req *user.UpdateUserRequest) (*responses.UserResponse, error) {
	hashing, err := s.hash.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	req.Password = hashing

	res, err := s.repository.UpdateUserById(id, req)
	if err != nil {
		return nil, err
	}

	mapper := s.mapper.ToUserResponse(res)

	return mapper, nil
}

func (s *userService) UpdateUserByUsername(username string, req *user.UpdateUserByUsernameRequest) (*responses.UserResponse, error) {
	updatedReq := models.User{
		FullName: req.FullName,
		Email:    req.Email,
	}

	res, err := s.repository.UpdateUserByUsername(username, updatedReq)
	if err != nil {
		return nil, err
	}

	mapper := s.mapper.ToUserResponse(res)

	return mapper, nil
}
