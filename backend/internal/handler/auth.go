package handler

import (
	"fmt"
	"time"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/auth"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

func (h *Handler) initAuthGroup(api *fiber.App) {
	authGroup := api.Group("/api/auth")

	authGroup.Get("/hello", h.handlerHello)

	authGroup.Post("/register", h.handlerRegister)
	authGroup.Post("/login", h.handlerLogin)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags Auth
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /auth/hello [get]
func (h *Handler) handlerHello(c *fiber.Ctx) error {
	return c.SendString("This is auth handler")
}

// @Summary Register a new user
// @Description Create a new user
// @Tags Auth
// @Accept multipart/form-data
// @Produce json
// @Param email formData string true "Email"
// @Param username formData string true "Username"
// @Param full_name formData string true "Full Name"
// @Param password formData string true "Password"
// @Param birth_date formData string true "Birth Date"
// @Param profile_image formData file true "Profile Image"
// @Param admin_code formData string false "Admin Code"
// @Success 201 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /auth/register [post]
func (h *Handler) handlerRegister(c *fiber.Ctx) error {
	birthDate, err := time.Parse("2006-01-02", c.FormValue("birth_date"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}
	registerReq := auth.RegisterRequest{
		Email:           c.FormValue("email"),
		Username:        c.FormValue("username"),
		FullName:        c.FormValue("full_name"),
		BirthDate:       birthDate,
		ProfileImageURL: c.FormValue("profile_image_url"),
		Password:        c.FormValue("password"),
		AdminCode:       c.FormValue("admin_code"),
	}

	file, err := c.FormFile("profile_image")
	if err == nil {
		c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    "Profile image is required",
			Error:      true,
		})
	}

	uploadedFile, err := file.Open()
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}
	defer uploadedFile.Close()

	fileName := fmt.Sprintf("%s/%s-1", "User", slug.Make(registerReq.FullName))
	imageUrl, err := h.cloudinary.UploadToCloudinary(uploadedFile, fileName)
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	registerReq.ProfileImageURL = imageUrl

	if err := registerReq.Validate(); err != nil {
		c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	user, err := h.service.Auth.Register(&registerReq)
	if err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully register user",
		StatusCode: fiber.StatusOK,
		Data:       user,
	})
}

// @Summary Login a user
// @Description Login a user
// @Tags Auth
// @Accept json
// @Produce json
// @Param data body auth.LoginRequest true "Login Request"
// @Success 200 {object} responses.Token
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /auth/login [post]
func (h *Handler) handlerLogin(c *fiber.Ctx) error {
	var body auth.LoginRequest

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	if err := body.Validate(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	res, err := h.service.Auth.Login(&body)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		StatusCode: fiber.StatusOK,
		Message:    "Login success",
		Data:       res,
	})
}
