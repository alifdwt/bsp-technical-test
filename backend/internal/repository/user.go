package repository

import (
	"errors"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/auth"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/user"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{db}
}

func (r *userRepository) CreateUser(registerReq *auth.RegisterRequest) (*models.User, error) {
	jwtSecret := viper.GetString("JWT_SECRET")
	var user models.User

	user.Username = registerReq.Username
	user.FullName = registerReq.FullName
	user.Email = registerReq.Email
	user.Password = registerReq.Password
	user.BirthDate = registerReq.BirthDate
	user.ProfileImageURL = registerReq.ProfileImageURL

	if registerReq.AdminCode == jwtSecret {
		user.Role = "admin"
	} else {
		user.Role = "customer"
	}

	db := r.db.Model(&user)

	result := db.Debug().Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func (r *userRepository) GetUserAll() (*[]models.User, error) {
	var users []models.User

	db := r.db.Model(&users)

	if err := db.Debug().Find(&users).Error; err != nil {
		return nil, err
	}

	return &users, nil
}

func (r *userRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User

	db := r.db.Model(user)

	if err := db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("email not found")
		}
		return nil, errors.New("error while fetching email: " + err.Error())
	}

	return &user, nil
}

func (r *userRepository) GetUserById(id int) (*models.User, error) {
	var user models.User

	db := r.db.Model(user)

	checkUserById := db.Debug().Where("id = ?", id).First(&user)
	if checkUserById.Error != nil {
		return nil, checkUserById.Error
	}

	return &user, nil
}

func (r *userRepository) GetUserByUsername(username string) (*models.User, error) {
	var user models.User

	db := r.db.Model(user)

	checkUserByUsername := db.Debug().Where("username = ?", username).First(&user)
	if checkUserByUsername.Error != nil {
		return nil, checkUserByUsername.Error
	}

	return &user, nil
}

func (r *userRepository) UpdateUserById(id int, updatedUser *user.UpdateUserRequest) (*models.User, error) {
	var user models.User

	db := r.db.Model(&user)

	checkUserById := db.Debug().Where("id = ?", id).First(&user)
	if checkUserById.Error != nil {
		return nil, checkUserById.Error
	}

	user.Username = updatedUser.Username
	user.FullName = updatedUser.FullName
	user.Email = updatedUser.Email
	user.Password = updatedUser.Password
	user.BirthDate = updatedUser.BirthDate
	user.ProfileImageURL = updatedUser.ProfileImageURL

	updateUser := db.Debug().Updates(&user)
	if updateUser.Error != nil {
		return nil, updateUser.Error
	}

	return &user, nil
}

func (r *userRepository) DeleteUserById(id int) (*models.User, error) {
	var user models.User

	db := r.db.Model(user)

	res, err := r.GetUserById(id)
	if err != nil {
		return nil, err
	}

	if err := db.Delete(&res).Error; err != nil {
		return nil, errors.New("error while deleting user: " + err.Error())
	}

	return res, nil
}
