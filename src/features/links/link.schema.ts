import { z } from "zod"

export const createLinkBodySchema = z.object({
    url: z.string().url().refine(
        (value) => value.startsWith("http://") || value.startsWith("https://"),
        {
            message: "URL must start with http:// or https://"
        }
    )
})

export const shortCodeParamsSchema = z.object({
    shortCode: z.string().min(1).max(32),
})

export type CreateLinkBody = z.infer<typeof createLinkBodySchema>
export type ShortCodeParams = z.infer<typeof shortCodeParamsSchema>


