package app

import (
	"github.com/alifdwt/bsp-technical-test-backend/internal/handler"
	"github.com/alifdwt/bsp-technical-test-backend/internal/mapper"
	"github.com/alifdwt/bsp-technical-test-backend/internal/repository"
	"github.com/alifdwt/bsp-technical-test-backend/internal/service"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/auth"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/cloudinary"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/database/postgres"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/dotenv"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/hashing"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/logger"
	"github.com/spf13/viper"

	"go.uber.org/zap"
)

// @title Bsp Technical Test Backend
// @version 1.0

// @contact.name Alif Dewantara
// @contact.url https://github.com/alifdwt
// @contact.email aputradewantara@gmail.com

// @host marginal-gabbey-alifdwt-44f5de28.koyeb.app
// @BasePath /api

// @securityDefinitions.apikey BearerAuth
// @in Header
// @name Authorization

func Run() {
	log, err := logger.NewLogger()
	if err != nil {
		log.Error("Error while initializing logger", zap.Error(err))
	}

	err = dotenv.Viper()
	if err != nil {
		log.Error("Error while initializing viper", zap.Error(err))
	}

	db, err := postgres.NewClient()
	if err != nil {
		log.Error("Error while initializing database", zap.Error(err))
	}

	myCloudinary, err := cloudinary.NewMyCloudinary()
	if err != nil {
		log.Error("Error while connecting to cloudinary", zap.Error(err))
	}

	hashing := hashing.NewHashingPassword()
	repository := repository.NewRepositories(db)

	token, err := auth.NewManager(viper.GetString("JWT_SECRET"))
	if err != nil {
		log.Error("Error while intializing token manager", zap.Error(err))
	}

	mapper := mapper.NewMapper()

	service := service.NewService(service.Deps{
		Repository: repository,
		Hashing:    *hashing,
		Token:      token,
		Logger:     *log,
		Mapper:     *mapper,
	})

	myHandler := handler.NewHandler(service, *myCloudinary, token)

	myHandler.InitHandler().Listen(":8080")
}
