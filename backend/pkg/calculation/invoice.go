package calculation

import (
	"errors"
	"fmt"
)

func CalculatePremiumBase(insuredPrice float32, premiumRate float32, isPermille bool, period int, premiumBase float32) (float32, error) {
	var calculatedPremiumBase float32
	if isPermille {
		calculatedPremiumBase = insuredPrice * (premiumRate / 1000) * float32(period)
	} else {
		calculatedPremiumBase = insuredPrice * (premiumRate / 100) * float32(period)
	}

	if calculatedPremiumBase != premiumBase {
		errText := fmt.Sprintf("calculated premium base is not equal to premium base, calculated: %f, expected: %f", calculatedPremiumBase, premiumBase)
		return 0, errors.New(errText)
	}

	return premiumBase, nil
}

func CalculatePremiumTotal(basePrice float32, transactionFee float32, total float32) (float32, error) {
	calculatedPremiumTotal := basePrice + transactionFee

	if calculatedPremiumTotal != total {
		errText := fmt.Sprintf("calculated premium total is not equal to total, calculated: %f, expected: %f", calculatedPremiumTotal, total)
		return 0, errors.New(errText)
	}

	return total, nil
}
