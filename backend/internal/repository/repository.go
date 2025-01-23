package repository

import "gorm.io/gorm"

type Repositories struct {
	User         UserRepository
	BuildingType BuildingTypeRepository
	Branch       BranchRepository
}

func NewRepositories(db *gorm.DB) *Repositories {
	return &Repositories{
		User:         NewUserRepository(db),
		BuildingType: NewBuildingTypeRepository(db),
		Branch:       NewBranchRepository(db),
	}
}
