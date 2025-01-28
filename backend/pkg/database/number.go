package database

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/alifdwt/bsp-technical-test-backend/internal/models"
	"gorm.io/gorm"
)

func GenerateInvoiceCode(db *gorm.DB, prefix string) (string, error) {
	var lastInvoice models.Invoice

	// Ambil invoice terakhir berdasarkan nomor invoice
	err := db.Order("id DESC").First(&lastInvoice).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return "", err
	}

	var lastNumber int
	if lastInvoice.Code != "" {
		// Ekstrak angka terakhir dari nomor invoice
		parts := strings.Split(lastInvoice.Code, ".")
		if len(parts) == 3 {
			lastNumber, _ = strconv.Atoi(parts[2]) // Ignore error for simplicity
		}
	}

	// Tambahkan 1 ke nomor terakhir
	newNumber := lastNumber + 1

	// Format nomor invoice baru
	newInvoiceNumber := fmt.Sprintf("%s%05d", prefix, newNumber)
	return newInvoiceNumber, nil
}

func GetNextInvoiceCode(db *gorm.DB) (string, error) {
	const prefix = "K.001."
	var lastInvoice models.Invoice

	// Ambil invoice terakhir berdasarkan ID (descending)
	err := db.Order("id DESC").First(&lastInvoice).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return "", err
	}

	// Ekstrak nomor terakhir
	var lastNumber int
	if lastInvoice.Code != "" {
		parts := strings.Split(lastInvoice.Code, ".")
		if len(parts) == 3 {
			lastNumber, _ = strconv.Atoi(parts[2]) // Ignore error for simplicity
		}
	}

	// Tambahkan 1 ke nomor terakhir
	newNumber := lastNumber + 1

	// Format nomor invoice baru
	nextInvoiceCode := fmt.Sprintf("%s%05d", prefix, newNumber)
	return nextInvoiceCode, nil
}
