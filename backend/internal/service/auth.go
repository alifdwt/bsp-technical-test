package service

import (
	"errors"
	"strconv"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/auth"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/mapper"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	customAuth "github.com/alifdwt/bsp-technical-test-backend/pkg/auth"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/hashing"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type authService struct {
	user   repository.UserRepository
	hash   hashing.Hashing
	log    logger.Logger
	token  customAuth.TokenManager
	mapper mapper.UserMapping
}

func NewAuthService(user repository.UserRepository, hash hashing.Hashing, log logger.Logger, token customAuth.TokenManager, mapper mapper.UserMapping) *authService {
	return &authService{
		user:   user,
		hash:   hash,
		log:    log,
		token:  token,
		mapper: mapper,
	}
}

func (s *authService) Register(input *auth.RegisterRequest) (*responses.UserResponse, error) {
	hashing, err := s.hash.HashPassword(input.Password)
	if err != nil {
		return nil, err
	}

	input.Password = hashing

	user, err := s.user.CreateUser(input)
	if err != nil {
		return nil, err
	}

	mapper := s.mapper.ToUserResponse(user)

	return mapper, nil
}

func (s *authService) Login(input *auth.LoginRequest) (*responses.Login, error) {
	res, err := s.user.GetUserByEmail(input.Email)
	if err != nil {
		return nil, errors.New("error while get user: " + err.Error())
	}

	err = s.hash.ComparePassword(res.Password, input.Password)
	if err != nil {
		return nil, errors.New("error while compare password: " + err.Error())
	}

	accessToken, err := s.createAccessToken(res.ID, res.Email, res.Username, res.FullName, res.Role)
	if err != nil {
		return nil, err
	}

	refreshToken, err := s.createRefreshToken(res.ID, res.Email, res.Username, res.FullName, res.Role)
	if err != nil {
		return nil, err
	}

	return &responses.Login{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		User:         *s.mapper.ToUserResponse(res),
	}, nil
}

func (s *authService) RefreshToken(req auth.RefreshTokenRequest) (*responses.Token, error) {
	res, err := s.token.ValidateToken(req.RefreshToken)
	if err != nil {
		return nil, errors.New("invalid refresh token")
	}

	userID, err := strconv.Atoi(res)
	if err != nil {
		return nil, errors.New("invalid refresh token type")
	}

	user, err := s.user.GetUserById(userID)
	if err != nil {
		return nil, errors.New("invalid refresh token user")
	}

	newToken, err := s.createAccessToken(user.ID, user.Email, user.Username, user.FullName, user.Role)
	if err != nil {
		return nil, errors.New("invalid access token")
	}

	newRefreshToken, err := s.createRefreshToken(user.ID, user.Email, user.Username, user.FullName, user.Role)
	if err != nil {
		return nil, errors.New("invalid refresh token")
	}

	return &responses.Token{
		AccessToken:  newToken,
		RefreshToken: newRefreshToken,
	}, nil
}

func (s *authService) createAccessToken(id int, email string, username string, fullname string, role string) (string, error) {
	res, err := s.token.NewJwtToken(id, email, username, fullname, []string{"access", role})
	if err != nil {
		return "", err
	}

	return res, nil
}

func (s *authService) createRefreshToken(id int, email string, username string, fullname string, role string) (string, error) {
	res, err := s.token.NewJwtToken(id, email, username, fullname, []string{"refresh", role})
	if err != nil {
		return "", err
	}

	return res, nil
}
