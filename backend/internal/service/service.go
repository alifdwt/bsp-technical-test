package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/mapper"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/auth"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/hashing"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type Service struct {
	Auth         AuthService
	User         UserService
	BuildingType BuildingTypeService
	Branch       BranchService
	FireProduct  FireProductService
	Invoice      InvoiceService
}

type Deps struct {
	Repository *repository.Repositories
	Hashing    hashing.Hashing
	Token      auth.TokenManager
	Logger     logger.Logger
	Mapper     mapper.Mapper
}

func NewService(deps Deps) *Service {
	return &Service{
		Auth:         NewAuthService(deps.Repository.User, deps.Hashing, deps.Logger, deps.Token, deps.Mapper.UserMapper),
		User:         NewUserService(deps.Repository.User, deps.Logger, deps.Mapper.UserMapper),
		BuildingType: NewBuildingTypeService(deps.Repository.BuildingType, deps.Logger),
		Branch:       NewBranchService(deps.Repository.Branch, deps.Logger),
		FireProduct:  NewFireProductService(deps.Repository.FireProduct, deps.Logger),
		Invoice:      NewInvoiceService(deps.Repository.Invoice, deps.Repository.FireProduct, deps.Logger),
	}
}
