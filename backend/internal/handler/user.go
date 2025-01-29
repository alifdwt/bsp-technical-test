package handler

import (
	"fmt"
	"strconv"
	"time"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/user"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

func (h *Handler) initUserGroup(api *fiber.App) {
	userGroup := api.Group("/api/user")

	userGroup.Get("/hello", h.handlerHelloUser)
	userGroup.Get("/:username", h.handlerGetUserByUsername)

	userGroup.Use(middleware.Protector())
	userGroup.Get("/", h.handlerGetAllUser)
	userGroup.Put("/username/:username", h.handlerUpdateUserByUsername)
	userGroup.Put("/:id", h.handlerUpdateUser)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags User
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /user/hello [get]
func (h *Handler) handlerHelloUser(c *fiber.Ctx) error {
	return c.SendString("This is user handler")
}

// @Summary Get all users
// @Description Get all users
// @Tags User
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /user [get]
func (h *Handler) handlerGetAllUser(c *fiber.Ctx) error {
	users, err := h.service.User.GetUserAll()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		StatusCode: fiber.StatusOK,
		Data:       users,
		Message:    "Successfully get all users",
	})
}

// @Summary Get user by username
// @Description Get user by username
// @Tags User
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /user/{username} [get]
func (h *Handler) handlerGetUserByUsername(c *fiber.Ctx) error {
	username := c.Params("username")

	user, err := h.service.User.GetUserByUsername(username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		StatusCode: fiber.StatusOK,
		Data:       user,
		Message:    "Successfully get user by username",
	})
}

// @Summary Update user by id
// @Description Update user by id
// @Tags User
// @Accept multipart/form-data
// @Produce json
// @Security BearerAuth
// @Param id path int true "User ID"
// @Param email formData string true "Email"
// @Param username formData string true "Username"
// @Param full_name formData string true "Full Name"
// @Param password formData string true "Password"
// @Param birth_date formData string true "Birth Date"
// @Param profile_image formData file true "Profile Image"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /user/{id} [put]
func (h *Handler) handlerUpdateUser(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	authorization := c.Get("Authorization")
	us := authorization[7:]
	userIdStr, aud, err := h.tokenManager.ValidateToken(us)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    err.Error(),
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	userId, _ := strconv.Atoi(userIdStr)

	existingUser, err := h.service.User.GetUserById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	if existingUser.ID != userId && aud != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusUnauthorized,
			Message:    "Unauthorized",
			Error:      true,
		})
	}

	birthDate, err := time.Parse("2006-01-02", c.FormValue("birth_date"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	updateReq := user.UpdateUserRequest{
		Email:     c.FormValue("email"),
		Username:  c.FormValue("username"),
		FullName:  c.FormValue("full_name"),
		BirthDate: birthDate,
		Password:  c.FormValue("password"),
	}

	file, err := c.FormFile("profile_image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	uploadedFile, err := file.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}
	defer uploadedFile.Close()

	fileName := fmt.Sprintf("%s/%s-1", "User", slug.Make(updateReq.FullName))
	imageUrl, err := h.cloudinary.UploadToCloudinary(uploadedFile, fileName)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	updateReq.ProfileImageURL = imageUrl

	if err := updateReq.Validate(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	user, err := h.service.User.UpdateUserById(id, &updateReq)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		StatusCode: fiber.StatusOK,
		Data:       user,
		Message:    "Successfully update user",
	})
}

// Update User By Username
// @Summary Update user by username
// @Description Update user by username
// @Tags User
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param username path string true "Username"
// @Param user body user.UpdateUserByUsernameRequest true "Update User By Username Request"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /user/username/{username} [put]
func (h *Handler) handlerUpdateUserByUsername(c *fiber.Ctx) error {
	authorization := c.Get("Authorization")
	us := authorization[7:]
	userIdStr, aud, err := h.tokenManager.ValidateToken(us)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    err.Error(),
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	username := c.Params("username")

	var body user.UpdateUserByUsernameRequest
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

	if aud == "admin" {
		user, err := h.service.User.UpdateUserByUsername(username, &body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Data:       user,
			Message:    "Successfully update user by username",
		})
	} else {
		existingUser, err := h.service.User.GetUserByUsername(username)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		userId, _ := strconv.Atoi(userIdStr)
		if existingUser.ID != userId {
			return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusUnauthorized,
				Message:    "Unauthorized",
				Error:      true,
			})
		}

		user, err := h.service.User.UpdateUserByUsername(username, &body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Data:       user,
			Message:    "Successfully update user by username",
		})
	}
}
