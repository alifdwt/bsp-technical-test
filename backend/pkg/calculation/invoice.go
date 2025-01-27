package calculation

import "errors"

func CalculatePremiumBase(insuredPrice float32, premiumRate float32, isPermille bool, period int, premiumBase float32) (float32, error) {
	var calculatedPremiumBase float32
	if isPermille {
		calculatedPremiumBase = insuredPrice * (premiumRate / 1000) * float32(period)
	} else {
		calculatedPremiumBase = insuredPrice * (premiumRate / 100) * float32(period)
	}

	if calculatedPremiumBase != premiumBase {
		return 0, errors.New("calculated premium base is not equal to premium base")
	}

	return premiumBase, nil
}