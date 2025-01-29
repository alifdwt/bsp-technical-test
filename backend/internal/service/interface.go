package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/auth"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/branch"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/buildingtype"
	fireproduct "github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/fire_product"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/invoice"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/policy"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
)

type AuthService interface {
	Register(input *auth.RegisterRequest) (*responses.UserResponse, error)
	Login(input *auth.LoginRequest) (*responses.Login, error)
	RefreshToken(req auth.RefreshTokenRequest) (*responses.Token, error)
}

type UserService interface {
	GetUserAll() (*[]responses.UserResponse, error)
	GetUserById(id int) (*responses.UserResponse, error)
	GetUserByUsername(username string) (*responses.UserResponse, error)
}

type BuildingTypeService interface {
	GetBuildingTypeAll() ([]models.BuildingType, error)
	GetBuildingTypeById(id int) (*models.BuildingType, error)
	CreateBuildingType(req *buildingtype.CreateBuildingTypeRequest) (*models.BuildingType, error)
	UpdateBuildingTypeById(id int, updatedBuildingType *buildingtype.UpdateBuildingTypeRequest) (*models.BuildingType, error)
	DeleteBuildingTypeById(id int) (*models.BuildingType, error)
}

type BranchService interface {
	GetBranchAll() ([]models.Branch, error)
	GetBranchById(id int) (*models.Branch, error)
	CreateBranch(req *branch.CreateBranch) (*models.Branch, error)
	UpdateBranchById(id int, updatedBranch *branch.UpdateBranch) (*models.Branch, error)
	DeleteBranchById(id int) error
}

type FireProductService interface {
	GetFireProductAll() ([]models.FireProduct, error)
	GetFireProductById(id int) (*models.FireProduct, error)
	GetFireProductByUserId(userId int) ([]models.FireProduct, error)
	CreateFireProduct(userId int, req fireproduct.CreateFireProductRequest) (*models.FireProduct, error)

	DeleteFireProductById(id int) error
}

type InvoiceService interface {
	GetInvoiceAll() ([]models.Invoice, error)
	GetInvoiceByCode(code string) (*models.Invoice, error)
	GetInvoiceByUserID(userID int) ([]models.Invoice, error)
	GetInvoiceByCodeAndUserID(code string, userID int) (*models.Invoice, error)
	CreateInvoice(userId int, req *invoice.CreateInvoiceRequest) (*models.Invoice, error)
	GetNextInvoiceCode() (string, error)
}

type PolicyService interface {
	CreatePolicy(userId int, req *policy.CreatePolicyRequest) (*models.Policy, error)
	DeletePolicyByCode(code string) error
}
