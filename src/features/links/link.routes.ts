import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
    createLinkBodySchema,
    shortCodeParamsSchema,
} from "./link.schema.js";
import {
    createLinkController,
    getLinkController,
    redirectController,
} from "./link.controller.js";

export const linkRouter = Router();

linkRouter.post(
    "/api/links",
    validateRequest({
        body: createLinkBodySchema,
    }),
    asyncHandler(createLinkController)
)

linkRouter.get(
    "/api/links/:shortCode",
    validateRequest({
        params: shortCodeParamsSchema
    }),
    asyncHandler(getLinkController)
);

linkRouter.get(
    "/:shortCode",
    validateRequest({
        params: shortCodeParamsSchema
    }),
    asyncHandler(redirectController)
);