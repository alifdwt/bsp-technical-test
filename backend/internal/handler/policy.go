package handler

import (
	"strconv"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/policy"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) initPolicyGroup(api *fiber.App) {
	policyGroup := api.Group("/api/policy")

	policyGroup.Get("/hello", h.handlerHelloPolicy)

	policyGroup.Use(middleware.Protector())
	policyGroup.Post("/", h.handlerCreatePolicy)
	policyGroup.Delete("/:code", h.handlerDeletePolicy)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags Policy
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /policy/hello [get]
func (h *Handler) handlerHelloPolicy(c *fiber.Ctx) error {
	return c.SendString("This is policy handler")
}

// @Summary Create a new policy
// @Description Create a new policy
// @Tags Policy
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param policy body policy.CreatePolicyRequest true "Policy data"
// @Success 201 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /policy [post]
func (h *Handler) handlerCreatePolicy(c *fiber.Ctx) error {
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
		var body policy.CreatePolicyRequest
		if err := c.BodyParser(&body); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
				Error:      true,
				Message:    err.Error(),
				StatusCode: fiber.StatusBadRequest,
			})
		}

		userId, _ := strconv.Atoi(userIdStr)
		policy, err := h.service.Policy.CreatePolicy(userId, &body)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				Error:      true,
				Message:    err.Error(),
				StatusCode: fiber.StatusInternalServerError,
			})
		}

		return c.Status(fiber.StatusCreated).JSON(responses.Response{
			StatusCode: fiber.StatusCreated,
			Message:    "Policy created successfully",
			Data:       policy,
		})
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    "Unauthorized",
			StatusCode: fiber.StatusUnauthorized,
		})
	}
}

// @Summary Delete a policy
// @Description Delete a policy
// @Tags Policy
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param code path string true "Policy code"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /policy/{code} [delete]
func (h *Handler) handlerDeletePolicy(c *fiber.Ctx) error {
	authorization := c.Get("Authorization")
	us := authorization[7:]
	_, aud, err := h.tokenManager.ValidateToken(us)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    err.Error(),
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	if aud == "admin" {
		code := c.Params("code")
		err := h.service.Policy.DeletePolicyByCode(code)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
				Error:      true,
				Message:    err.Error(),
				StatusCode: fiber.StatusInternalServerError,
			})
		}

		return c.Status(fiber.StatusOK).JSON(responses.Response{
			StatusCode: fiber.StatusOK,
			Message:    "Policy deleted successfully",
		})
	} else {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    "Unauthorized",
			StatusCode: fiber.StatusUnauthorized,
		})
	}
}
