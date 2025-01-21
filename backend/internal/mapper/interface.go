package mapper

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
)

type UserMapping interface {
	ToUserResponse(request *models.User) *responses.UserResponse
	ToUserResponses(requests *[]models.User) []responses.UserResponse
}
