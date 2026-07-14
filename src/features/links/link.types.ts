export type LinkRecord = {
    id: number,
    short_code: string,
    original_url: string,
    click_count: number,
    createdAt: string
};

export type LinkDto = {
    shortCode: string,
    originalUrl: string,
    clickCount: number,
    createdAt: string
}

export type CreateLinkResult = {
    shortCode: string,
    original_url: string
}