package handler

import (
	"strconv"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/branch"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) initBranchGroup(api *fiber.App) {
	branchGroup := api.Group("/api/branch")

	branchGroup.Get("/hello", h.handlerHelloBranch)

	branchGroup.Use(middleware.Protector())
	branchGroup.Get("/", h.handlerGetAllBranch)
	branchGroup.Get("/:id", h.handlerGetBranchById)
	branchGroup.Post("/", h.handlerCreateBranch)
	branchGroup.Put("/:id", h.handlerUpdateBranch)
	branchGroup.Delete("/:id", h.handlerDeleteBranch)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags Branch
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /branch/hello [get]
func (h *Handler) handlerHelloBranch(c *fiber.Ctx) error {
	return c.SendString("This is branch handler")
}

// @Summary Get all branches
// @Description Get all branches
// @Tags Branch
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} responses.Response
// @Failure 500 {object} responses.ErrorMessage
// @Router /branch [get]
func (h *Handler) handlerGetAllBranch(c *fiber.Ctx) error {
	branches, err := h.service.Branch.GetBranchAll()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully get all branches",
		Data:       branches,
		StatusCode: fiber.StatusOK,
	})
}

// @Summary Get branch by ID
// @Description Get branch by ID
// @Tags Branch
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Branch ID"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /branch/{id} [get]
func (h *Handler) handlerGetBranchById(c *fiber.Ctx) error {
	id := c.Params("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	branch, err := h.service.Branch.GetBranchById(idInt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully get branch",
		Data:       branch,
		StatusCode: fiber.StatusOK,
	})
}

// @Summary Create a branch
// @Description Create a branch
// @Tags Branch
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param branch body branch.CreateBranch true "Branch data"
// @Success 201 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /branch [post]
func (h *Handler) handlerCreateBranch(c *fiber.Ctx) error {
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

	if aud != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    "You are not allowed to create a new building type",
			StatusCode: fiber.StatusUnauthorized,
		})
	}

	var body branch.CreateBranch
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

	branch, err := h.service.Branch.CreateBranch(&body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(responses.Response{
		Message:    "Successfully create a branch",
		Data:       branch,
		StatusCode: fiber.StatusCreated,
	})
}

// @Summary Update a branch
// @Description Update a branch
// @Tags Branch
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Branch ID"
// @Param branch body branch.UpdateBranch true "Update Branch Request"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /branch/{id} [put]
func (h *Handler) handlerUpdateBranch(c *fiber.Ctx) error {
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

	if aud != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    "You are not allowed to update a branch",
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

	var body branch.UpdateBranch
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

	branch, err := h.service.Branch.UpdateBranchById(idInt, &body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully update branch",
		Data:       branch,
		StatusCode: fiber.StatusOK,
	})
}

// @Summary Delete a branch
// @Description Delete a branch
// @Tags Branch
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Branch ID"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /branch/{id} [delete]
func (h *Handler) handlerDeleteBranch(c *fiber.Ctx) error {
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

	if aud != "admin" {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorMessage{
			Error:      true,
			Message:    "You are not allowed to delete a branch",
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

	err = h.service.Branch.DeleteBranchById(idInt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully delete branch",
		StatusCode: fiber.StatusOK,
	})
}
