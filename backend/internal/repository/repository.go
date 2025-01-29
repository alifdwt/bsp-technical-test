package repository

import "gorm.io/gorm"

type Repositories struct {
	User         UserRepository
	BuildingType BuildingTypeRepository
	Branch       BranchRepository
	FireProduct  FireProductRepository
	Invoice      InvoiceRepository
	Policy       PolicyRepository
}

func NewRepositories(db *gorm.DB) *Repositories {
	return &Repositories{
		User:         NewUserRepository(db),
		BuildingType: NewBuildingTypeRepository(db),
		Branch:       NewBranchRepository(db),
		FireProduct:  NewFireProductRepository(db),
		Invoice:      NewInvoiceRepository(db),
		Policy:       NewPolicyRepository(db),
	}
}
