package repository

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/auth"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/user"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
)

type UserRepository interface {
	GetUserAll() (*[]models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserById(id int) (*models.User, error)
	GetUserByUsername(username string) (*models.User, error)
	CreateUser(registerReq *auth.RegisterRequest) (*models.User, error)
	UpdateUserById(id int, updatedUser *user.UpdateUserRequest) (*models.User, error)
	DeleteUserById(id int) (*models.User, error)
}
