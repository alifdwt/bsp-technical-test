package repository

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/database"
	"gorm.io/gorm"
)

type invoiceRepository struct {
	db *gorm.DB
}

func NewInvoiceRepository(db *gorm.DB) *invoiceRepository {
	return &invoiceRepository{db}
}

func (r *invoiceRepository) CreateInvoice(req models.Invoice) (*models.Invoice, error) {
	db := r.db.Model(&req)

	newInvoiceNumber, err := database.GenerateInvoiceCode(r.db, "K.001.")
	if err != nil {
		return nil, err
	}

	req.Code = newInvoiceNumber

	result := db.Debug().Create(&req)
	if result.Error != nil {
		return nil, result.Error
	}

	return &req, nil
}
