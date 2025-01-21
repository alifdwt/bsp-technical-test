package handler

import (
	_ "github.com/alifdwt/bsp-technical-test-backend/docs"
	"github.com/alifdwt/bsp-technical-test-backend/internal/service"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/auth"
	"github.com/alifdwt/bsp-technical-test-backend/pkg/cloudinary"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

type Handler struct {
	service      *service.Service
	cloudinary   cloudinary.MyCloudinary
	tokenManager auth.TokenManager
}

func NewHandler(service *service.Service, cloudinary cloudinary.MyCloudinary, tokenManager auth.TokenManager) *Handler {
	return &Handler{
		service:      service,
		cloudinary:   cloudinary,
		tokenManager: tokenManager,
	}
}

func (h *Handler) InitHandler() *fiber.App {
	router := fiber.New()

	router.Use(logger.New(
		logger.Config{
			Format:     "${cyan}[${time}] ${white}${pid} ${red}${status} ${blue}[${method}] ${white}${path}\n",
			TimeFormat: "02-Jan-2006 15:04:05",
			TimeZone:   "UTC-7",
		},
	))
	router.Use(cors.New())

	router.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	router.Get("/docs/*", swagger.HandlerDefault)

	h.InitApi(router)

	return router
}

func (h *Handler) InitApi(router *fiber.App) {
	h.initAuthGroup(router)
}
