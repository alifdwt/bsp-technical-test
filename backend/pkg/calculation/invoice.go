package calculation

import (
	"errors"
	"fmt"
	"math"
)

func CalculatePremiumBase(insuredPrice float64, premiumRate float64, isPermille bool, period int, premiumBase float64) (float64, error) {
	var calculatedPremiumBase float64
	if isPermille {
		calculatedPremiumBase = insuredPrice * (premiumRate / 1000) * float64(period)
	} else {
		calculatedPremiumBase = insuredPrice * (premiumRate / 100) * float64(period)
	}

	// Gunakan toleransi kecil untuk menghindari perbedaan presisi
	tolerance := 0.01
	if math.Abs(calculatedPremiumBase-premiumBase) > tolerance {
		errText := fmt.Sprintf("calculated premium base is not equal to premium base, calculated: %f, expected: %f", calculatedPremiumBase, premiumBase)
		return 0, errors.New(errText)
	}

	return premiumBase, nil
}

func CalculatePremiumTotal(basePrice float64, transactionFee float64, total float64) (float64, error) {
	calculatedPremiumTotal := basePrice + transactionFee

	if calculatedPremiumTotal != total {
		errText := fmt.Sprintf("calculated premium total is not equal to total, calculated: %f, expected: %f", calculatedPremiumTotal, total)
		return 0, errors.New(errText)
	}

	return total, nil
}
