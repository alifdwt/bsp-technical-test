package auth

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JwtCustomClaims struct {
	// Email    string `json:"email"`
	// Username string `json:"username"`
	// Fullname string `json:"fullname"`
	jwt.RegisteredClaims
}

type TokenManager interface {
	NewJwtToken(userId int, email string, username string, fullname string, audience []string) (string, error)
	ValidateToken(accessToken string) (string, string, error)
}

type Manager struct {
	signingKey string
}

func NewManager(signingKey string) (*Manager, error) {
	if signingKey == "" {
		return nil, errors.New("empty signing key")
	}

	return &Manager{signingKey: signingKey}, nil
}

func (m *Manager) NewJwtToken(userId int, email string, username string, fullname string, audience []string) (string, error) {
	nowTime := time.Now()
	expireTime := nowTime.Add(12 * time.Hour)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, JwtCustomClaims{
		// email,
		// username,
		// fullname,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
			Issuer:    strconv.Itoa(int(nowTime.Unix())),
			Subject:   strconv.Itoa(userId),
			Audience:  audience,
		},
	})

	return token.SignedString([]byte(m.signingKey))
}

func (m *Manager) ValidateToken(accessToken string) (string, string, error) {
	token, err := jwt.Parse(accessToken, func(token *jwt.Token) (i interface{}, err error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(m.signingKey), nil
	})
	if err != nil {
		return "", "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", "", errors.New("invalid token")
	}

	subject, ok := claims["sub"].(string)
	if !ok {
		return "", "", errors.New("subject claim not found or not a string")
	}

	aud, ok := token.Claims.(jwt.MapClaims)["aud"]
	if !ok {
		return "", "", errors.New("audience claim not found")
	}

	audience, ok := aud.([]interface{})
	if !ok {
		return "", "", errors.New("audience claim is not an array")
	}

	// Convert []interface{} to []string
	roles := make([]string, len(audience))
	for i, v := range audience {
		role, ok := v.(string)
		if !ok {
			return "", "", errors.New("audience claim contains non-string value")
		}
		roles[i] = role
	}

	role := roles[len(roles)-1] // Get the last role

	fmt.Println("Subject: ", subject)

	return subject, role, nil
}
