import type { RequestHandler } from "express";
import { env } from "../../config/env.js";
import {
    createShortLink,
    getLink,
    resolveShortLink,
} from "./link.service.js";
import type { CreateLinkBody, ShortCodeParams } from "./link.schema.js";


export const createLinkController: RequestHandler<
    unknown,
    unknown,
    CreateLinkBody
> = async (req, res) => {
    const link = await createShortLink(req.body.url);

    return res.status(201).json({
        data: {
            shortCode: link!.shortCode,
            shortUrl: `${env.BASE_URL}/${link!.shortCode}`,
            originalUrl: link?.original_url,
        },
    });
}

export const getLinkController: RequestHandler<ShortCodeParams>
    = async (req, res) => {
        const link = await getLink(req.params.shortCode);

        return res.status(201).json({
            data: link,
        });
    }

export const redirectController: RequestHandler<ShortCodeParams>
    = async (req, res) => {
        const link = await resolveShortLink(req.params.shortCode);

        return res.redirect(302, link)
    }