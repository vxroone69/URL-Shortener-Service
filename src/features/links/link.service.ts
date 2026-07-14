import { nanoid } from "nanoid";
import { AppError } from "../../errors/AppError";
import {
    findLinkByShortCode,
    incrementClickCount,
    insertLink
} from "./link.repository";
import type { CreateLinkResult, LinkDto, LinkRecord } from "./link.types.js";

const SHORT_CODE_LENGTH = 7;
const MAX_CODE_GENERATION_ATTEMPTS = 5;

function toLinkDto(record: LinkRecord): LinkDto {
    return {
        shortCode: record.short_code,
        originalUrl: record.original_url,
        clickCount: record.click_count,
        createdAt: record.createdAt
    }
}

function isUniqueConstraintError(error: unknown): boolean {
    return error instanceof Error && error.message.includes("UNIQUE");
}

export async function createShortLink(
    original_url: string
): Promise<CreateLinkResult | undefined> {
    for (let attempt = 1; attempt <= MAX_CODE_GENERATION_ATTEMPTS; attempt += 1) {
        const shortCode = nanoid(SHORT_CODE_LENGTH);

        try {
            await insertLink(shortCode, original_url)

            return {
                shortCode,
                original_url
            }
        } catch (error) {
            if (isUniqueConstraintError(error)) {
                continue;
            }

            throw error;

        }
        throw new AppError("Could not generate unique short code", 500);

    }
}

export async function getLink(shortCode: string): Promise<LinkDto> {
    const link = await findLinkByShortCode(shortCode);

    if (!link) {
        throw new AppError("Short link not found", 404);
    }

    return toLinkDto(link)
}

export async function resolveShortLink(shortCode: string): Promise<string> {
    const link = await findLinkByShortCode(shortCode);

    if (!link) {
        throw new AppError("Short link not found", 404);
    }

    await incrementClickCount(shortCode);

    return link.original_url;
}



