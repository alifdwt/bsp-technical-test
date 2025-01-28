package handler

import (
	"strconv"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/invoice"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) initInvoiceGroup(api *fiber.App) {
	invoiceGroup := api.Group("/api/invoice")

	invoiceGroup.Get("/hello", h.handlerHelloInvoice)

	invoiceGroup.Use(middleware.Protector())
	invoiceGroup.Get("/", h.handlerGetAllInvoice)
	invoiceGroup.Get("/next-code", h.handlerGetNextInvoiceCode)
	invoiceGroup.Get("/:code", h.handlerGetInvoiceByCode)
	invoiceGroup.Post("/", h.handlerCreateInvoice)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags Invoice
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /invoice/hello [get]
func (h *Handler) handlerHelloInvoice(c *fiber.Ctx) error {
	return c.SendString("This is invoice handler")
}

// @Summary Get all invoices
// @Description Get all invoices
// @Tags Invoice
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /invoice [get]
func (h *Handler) handlerGetAllInvoice(c *fiber.Ctx) error {
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
		invoices, err := h.service.Invoice.GetInvoiceAll()
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
			})
		}

		return c.JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Data:       invoices,
		})
	} else {
		userId, _ := strconv.Atoi(userIdStr)
		invoices, err := h.service.Invoice.GetInvoiceByUserID(userId)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Data:       invoices,
			Message:    "Successfully get all invoices",
		})
	}
}

// @Summary Get an invoice by Code
// @Description Get an invoice by Code
// @Tags Invoice
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param code path string true "Invoice Code"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 404 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /invoice/{code} [get]
func (h *Handler) handlerGetInvoiceByCode(c *fiber.Ctx) error {
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

	code := c.Params("code")
	if code == "" {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    "Code is required",
		})
	}

	if aud == "admin" {
		invoice, err := h.service.Invoice.GetInvoiceByCode(code)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
			})
		}

		return c.JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Data:       invoice,
		})
	} else {
		userId, _ := strconv.Atoi(userIdStr)
		invoice, err := h.service.Invoice.GetInvoiceByCodeAndUserID(code, userId)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Data:       invoice,
			Message:    "Successfully get invoice",
		})
	}
}

// @Summary Create an invoice
// @Description Create an invoice
// @Tags Invoice
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param input body invoice.CreateInvoiceRequest true "Create Invoice Request"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /invoice [post]
func (h *Handler) handlerCreateInvoice(c *fiber.Ctx) error {
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

	var body invoice.CreateInvoiceRequest
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
		})
	}

	if err := body.Validate(); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	if aud == "customer" {
		userId, _ := strconv.Atoi(userIdStr)
		invoice, err := h.service.Invoice.CreateInvoice(userId, &body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				StatusCode: fiber.StatusInternalServerError,
				Message:    err.Error(),
			})
		}

		return c.Status(fiber.StatusCreated).JSON(responses.Response{
			StatusCode: fiber.StatusCreated,
			Data:       invoice,
			Message:    "Successfully create invoice",
		})
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusUnauthorized,
			Message:    "Unauthorized",
			Error:      true,
		})
	}
}

// @Summary Get next invoice code
// @Description Get next invoice code
// @Tags Invoice
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /invoice/next-code [get]
func (h *Handler) handlerGetNextInvoiceCode(c *fiber.Ctx) error {
	// authorization := c.Get("Authorization")
	// us := authorization[7:]
	// _, _, err := h.tokenManager.ValidateToken(us)
	// if err != nil {
	// 	return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
	// 		Error:      true,
	// 		Message:    err.Error(),
	// 		StatusCode: fiber.StatusUnauthorized,
	// 	})
	// }

	nextCode, err := h.service.Invoice.GetNextInvoiceCode()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		StatusCode: fiber.StatusOK,
		Data:       nextCode,
	})
}
