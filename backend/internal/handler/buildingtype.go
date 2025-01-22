package handler

import (
	"strconv"

	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/requests/buildingtype"
	"github.com/alifdwt/bsp-technical-test-backend/internal/domain/responses"
	"github.com/alifdwt/bsp-technical-test-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func (h *Handler) initBuildingTypeGroup(api *fiber.App) {
	buildingTypeGroup := api.Group("/api/buildingtype")

	buildingTypeGroup.Get("/hello", h.handlerHelloBuildingType)

	buildingTypeGroup.Use(middleware.Protector())
	buildingTypeGroup.Get("/", h.handlerGetAllBuildingType)
	buildingTypeGroup.Get("/:id", h.handlerGetBuildingTypeById)
	buildingTypeGroup.Post("/", h.handlerCreateBuildingType)
	buildingTypeGroup.Put("/:id", h.handlerUpdateBuildingType)
	buildingTypeGroup.Delete("/:id", h.handlerDeleteBuildingType)
}

// @Summary Greet the user
// @Description Return a greeting message to the user
// @Tags BuildingType
// @Produce plain
// @Success 200 {string} string "OK"
// @Router /buildingtype/hello [get]
func (h *Handler) handlerHelloBuildingType(c *fiber.Ctx) error {
	return c.SendString("This is buildingtype handler")
}

// @Summary Get all building types
// @Description Get all building types
// @Tags BuildingType
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} responses.Response
// @Failure 500 {object} responses.ErrorMessage
// @Router /buildingtype [get]
func (h *Handler) handlerGetAllBuildingType(c *fiber.Ctx) error {
	buildingTypes, err := h.service.BuildingType.GetBuildingTypeAll()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully get all building types",
		Data:       buildingTypes,
		StatusCode: fiber.StatusOK,
	})
}

// @Summary Get building type by id
// @Description Get building type by id
// @Tags BuildingType
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Building Type ID"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /buildingtype/{id} [get]
func (h *Handler) handlerGetBuildingTypeById(c *fiber.Ctx) error {
	id := c.Params("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	buildingType, err := h.service.BuildingType.GetBuildingTypeById(idInt)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully get building type by id",
		Data:       buildingType,
		StatusCode: fiber.StatusOK,
	})
}

// @Summary Create a new building type
// @Description Create a new building type
// @Tags BuildingType
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param buildingtype body buildingtype.CreateBuildingTypeRequest true "Create Building Type Request"
// @Success 201 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /buildingtype [post]
func (h *Handler) handlerCreateBuildingType(c *fiber.Ctx) error {
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

	var body buildingtype.CreateBuildingTypeRequest
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

	buildingType, err := h.service.BuildingType.CreateBuildingType(&body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(responses.Response{
		Message:    "Successfully create a new building type",
		Data:       buildingType,
		StatusCode: fiber.StatusCreated,
	})
}

// @Summary Update a building type
// @Description Update a building type
// @Tags BuildingType
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Building Type ID"
// @Param buildingtype body buildingtype.UpdateBuildingTypeRequest true "Update Building Type Request"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /buildingtype/{id} [put]
func (h *Handler) handlerUpdateBuildingType(c *fiber.Ctx) error {
	id := c.Params("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	var body buildingtype.UpdateBuildingTypeRequest
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

	buildingType, err := h.service.BuildingType.UpdateBuildingTypeById(idInt, &body)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully update building type",
		Data:       buildingType,
		StatusCode: fiber.StatusOK,
	})
}

// @Summary Delete a building type
// @Description Delete a building type
// @Tags BuildingType
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path string true "Building Type ID"
// @Success 200 {object} responses.Response
// @Failure 400 {object} responses.ErrorMessage
// @Failure 500 {object} responses.ErrorMessage
// @Router /buildingtype/{id} [delete]
func (h *Handler) handlerDeleteBuildingType(c *fiber.Ctx) error {
	id := c.Params("id")
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusBadRequest,
			Message:    err.Error(),
			Error:      true,
		})
	}

	_, err = h.service.BuildingType.DeleteBuildingTypeById(idInt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorMessage{
			StatusCode: fiber.StatusInternalServerError,
			Message:    err.Error(),
			Error:      true,
		})
	}

	return c.Status(fiber.StatusOK).JSON(responses.Response{
		Message:    "Successfully delete building type",
		StatusCode: fiber.StatusOK,
		Data:       nil,
	})
}
