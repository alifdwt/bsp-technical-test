package repository

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/auth"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/branch"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/buildingtype"
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

type BuildingTypeRepository interface {
	GetBuildingTypeAll() (*[]models.BuildingType, error)
	GetBuildingTypeById(id int) (*models.BuildingType, error)
	CreateBuildingType(req *buildingtype.CreateBuildingTypeRequest) (*models.BuildingType, error)
	UpdateBuildingTypeById(id int, updatedBuildingType *buildingtype.UpdateBuildingTypeRequest) (*models.BuildingType, error)
	DeleteBuildingTypeById(id int) (*models.BuildingType, error)
}

type BranchRepository interface {
	CreateBranch(req *branch.CreateBranch) (*models.Branch, error)
	GetBranchAll() (*[]models.Branch, error)
	GetBranchById(id int) (*models.Branch, error)
	UpdateBranchById(id int, req *branch.UpdateBranch) (*models.Branch, error)
	DeleteBranchById(id int) error
}

type FireProductRepository interface {
	CreateFireProduct(req models.FireProduct) (*models.FireProduct, error)
	GetFireProductAll() (*[]models.FireProduct, error)
	GetFireProductById(id int) (*models.FireProduct, error)
	GetFireProductByUserId(id int) (*[]models.FireProduct, error)
	UpdateFireProductById(id int, updatedFireProduct models.FireProduct) (*models.FireProduct, error)
	DeleteFireProductById(id int) error

	SetFireProductInvoiceCode(id int, code string) error
}

type InvoiceRepository interface {
	CreateInvoice(req models.Invoice) (*models.Invoice, error)
	GetInvoiceByCode(code string) (*models.Invoice, error)
	GetInvoiceAll() (*[]models.Invoice, error)
	GetInvoiceByUserID(userID int) (*[]models.Invoice, error)
	GetInvoiceByCodeAndUserID(code string, userID int) (*models.Invoice, error)
	GetNextInvoiceCode() (string, error)
}
