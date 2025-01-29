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

func (r *invoiceRepository) GetInvoiceAll() (*[]models.Invoice, error) {
	var invoices []models.Invoice
	if err := r.db.Find(&invoices).Error; err != nil {
		return nil, err
	}

	return &invoices, nil
}

// Get invoice by user id
func (r *invoiceRepository) GetInvoiceByUserID(userID int) (*[]models.Invoice, error) {
	var invoices []models.Invoice
	if err := r.db.Where("user_id = ?", userID).Find(&invoices).Error; err != nil {
		return nil, err
	}

	return &invoices, nil
}

func (r *invoiceRepository) GetInvoiceByCode(code string) (*models.Invoice, error) {
	var invoice models.Invoice
	result := r.db.Where("code = ?", code).Preload("FireProduct.BuildingType").Preload("User").First(&invoice)
	if result.Error != nil {
		return nil, result.Error
	}

	return &invoice, nil
}

func (r *invoiceRepository) GetInvoiceByCodeAndUserID(code string, userID int) (*models.Invoice, error) {
	var invoice models.Invoice
	result := r.db.Where("code = ? AND user_id = ?", code, userID).Preload("FireProduct").Preload("User").First(&invoice)
	if result.Error != nil {
		return nil, result.Error
	}

	return &invoice, nil
}

func (r *invoiceRepository) GetNextInvoiceCode() (string, error) {
	newInvoiceNumber, err := database.GetNextInvoiceCode(r.db)
	if err != nil {
		return "", err
	}

	return newInvoiceNumber, nil
}
