package handler

import (
	"strconv"

	fireproduct "github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/fire_product"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) initFireProductGroup(api *fiber.App) {
	fireProductGroup := api.Group("/api/product/fire")

	fireProductGroup.Get("/hello", h.handlerHelloFireProduct)

	fireProductGroup.Use(middleware.Protector())
	fireProductGroup.Get("/", h.handlerGetAllFireProduct)
	fireProductGroup.Get("/:id", h.handlerGetFireProductById)
	fireProductGroup.Post("/", h.handlerCreateFireProduct)
	fireProductGroup.Delete("/:id", h.handlerDeleteFireProduct)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags FireProduct
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /product/fire/hello [get]
func (h *Handler) handlerHelloFireProduct(c *fiber.Ctx) error {
	return c.SendString("This is fire product handler")
}

// @Summary Get all fire products
// @Description Get all fire products
// @Tags FireProduct
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} responses.Response
// @Failure 500 {object} responses.ErrorMessage
// @Router /product/fire [get]
func (h *Handler) handlerGetAllFireProduct(c *fiber.Ctx) error {
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

	if aud == "admin" {
		fireProducts, err := h.service.FireProduct.GetFireProductAll()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			Message:    "Successfully get all fire products",
			Data:       fireProducts,
			StatusCode: fiber.StatusOK,
		})
	} else {
		userId, _ := strconv.Atoi(userIdStr)
		fireProducts, err := h.service.FireProduct.GetFireProductByUserId(userId)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			Message:    "Successfully get all fire products",
			Data:       fireProducts,
			StatusCode: fiber.StatusOK,
		})
	}
}

// @Summary Get fire product by id
// @Description Get fire product by id
// @Tags FireProduct
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path int true "Fire Product ID"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /product/fire/{id} [get]
func (h *Handler) handlerGetFireProductById(c *fiber.Ctx) error {
	authorization := c.Get("Authorization")
	us := authorization[7:]
	userId, aud, err := h.tokenManager.ValidateToken(us)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    err.Error(),
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	id := c.Params("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	if aud == "admin" {
		fireProduct, err := h.service.FireProduct.GetFireProductById(idInt)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusBadRequest,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			Message:    "Successfully get fire product by id",
			Data:       fireProduct,
			StatusCode: fiber.StatusOK,
		})
	} else {
		userIdInt, _ := strconv.Atoi(userId)
		fireProduct, err := h.service.FireProduct.GetFireProductById(idInt)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusBadRequest,
				Message:    err.Error(),
				Error:      true,
			})
		}

		if fireProduct.UserID != userIdInt {
			return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusUnauthorized,
				Message:    "Unauthorized",
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			Message:    "Successfully get fire product by id",
			Data:       fireProduct,
			StatusCode: fiber.StatusOK,
		})
	}
}

// @Summary Create a new fire product
// @Description Create a new fire product
// @Tags FireProduct
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param fireproduct body fireproduct.CreateFireProductRequest true "Create Fire Product Request"
// @Success 201 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /product/fire [post]
func (h *Handler) handlerCreateFireProduct(c *fiber.Ctx) error {
	authorization := c.Get("Authorization")
	us := authorization[7:]
	userId, aud, err := h.tokenManager.ValidateToken(us)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    err.Error(),
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	var body fireproduct.CreateFireProductRequest
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
		userIdBody := body.UserID
		if userIdBody == 0 {
			return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusBadRequest,
				Message:    "User ID is required",
				Error:      true,
			})
		}

		fireProduct, err := h.service.FireProduct.CreateFireProduct(userIdBody, body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusCreated).JSON(responses.Response{
			Message:    "Successfully create a new fire product",
			Data:       fireProduct,
			StatusCode: fiber.StatusCreated,
		})
	} else {
		userIdInt, _ := strconv.Atoi(userId)
		body.UserID = userIdInt
		fireProduct, err := h.service.FireProduct.CreateFireProduct(userIdInt, body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusCreated).JSON(responses.Response{
			Message:    "Successfully create a new fire product",
			Data:       fireProduct,
			StatusCode: fiber.StatusCreated,
		})
	}
}

// @Summary Delete fire product by id
// @Description Delete fire product by id
// @Tags FireProduct
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path int true "Fire Product ID"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /product/fire/{id} [delete]
func (h *Handler) handlerDeleteFireProduct(c *fiber.Ctx) error {
	authorization := c.Get("Authorization")
	us := authorization[7:]
	userId, aud, err := h.tokenManager.ValidateToken(us)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    err.Error(),
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	id := c.Params("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	if aud == "admin" {
		err := h.service.FireProduct.DeleteFireProductById(idInt)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			Message:    "Successfully delete fire product",
			StatusCode: fiber.StatusOK,
			Data:       nil,
		})
	} else {
		userIdInt, _ := strconv.Atoi(userId)
		fireProduct, err := h.service.FireProduct.GetFireProductById(idInt)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusBadRequest,
				Message:    err.Error(),
				Error:      true,
			})
		}

		if fireProduct.UserID != userIdInt {
			return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusUnauthorized,
				Message:    "Unauthorized",
				Error:      true,
			})
		}

		err = h.service.FireProduct.DeleteFireProductById(idInt)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
				Error:      true,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			Message:    "Successfully delete fire product",
			StatusCode: fiber.StatusOK,
			Data:       nil,
		})
	}
}
