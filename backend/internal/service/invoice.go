package service

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/invoice"
	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/calculation"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
)

type invoiceService struct {
	repo            repository.InvoiceRepository
	fireProductRepo repository.FireProductRepository
	log             logger.Logger
}

func NewInvoiceService(repo repository.InvoiceRepository, fireProductRepo repository.FireProductRepository, log logger.Logger) *invoiceService {
	return &invoiceService{
		repo:            repo,
		fireProductRepo: fireProductRepo,
		log:             log,
	}
}

func (s *invoiceService) GetInvoiceAll() ([]models.Invoice, error) {
	invoices, err := s.repo.GetInvoiceAll()
	if err != nil {
		return nil, err
	}

	return *invoices, nil
}

func (s *invoiceService) GetInvoiceByCode(code string) (*models.Invoice, error) {
	invoice, err := s.repo.GetInvoiceByCode(code)
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (s *invoiceService) GetInvoiceByUserID(userID int) ([]models.Invoice, error) {
	invoices, err := s.repo.GetInvoiceByUserID(userID)
	if err != nil {
		return nil, err
	}

	return *invoices, nil
}

func (s *invoiceService) GetInvoiceByCodeAndUserID(code string, userID int) (*models.Invoice, error) {
	invoice, err := s.repo.GetInvoiceByCodeAndUserID(code, userID)
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (s *invoiceService) CreateInvoice(userId int, req *invoice.CreateInvoiceRequest) (*models.Invoice, error) {
	premiumBase, err := calculation.CalculatePremiumBase(req.InsuredPrice, req.PremiumRate, true, req.Period, req.PremiumBase)
	if err != nil {
		return nil, err
	}

	premiumTotal, err := calculation.CalculatePremiumTotal(premiumBase, req.TransactionFee, req.Total)
	if err != nil {
		return nil, err
	}

	newInvoice := models.Invoice{
		FireProductID:  req.FireProductID,
		Period:         req.Period,
		InsuredPrice:   req.InsuredPrice,
		PremiumRate:    req.PremiumRate,
		PremiumBase:    premiumBase,
		TransactionFee: req.TransactionFee,
		Total:          premiumTotal,
		UserID:         userId,
	}

	invoice, err := s.repo.CreateInvoice(newInvoice)
	if err != nil {
		return nil, err
	}

	err = s.fireProductRepo.SetFireProductInvoiceCode(req.FireProductID, invoice.Code)
	if err != nil {
		return nil, err
	}

	return invoice, nil
}

func (s *invoiceService) GetNextInvoiceCode() (string, error) {
	code, err := s.repo.GetNextInvoiceCode()
	if err != nil {
		return "", err
	}

	return code, nil
}
