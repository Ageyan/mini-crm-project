import type { Response } from "express";

export const errorHandler = (error: unknown, res: Response, textError: string) => {
    if (error instanceof Error) {
        console.error(`Failed ${textError}`, error.message);
    } else {
        console.error('Unknown error:', error);
    }

    return res.status(500).json({ message: `Failed server ${textError}`});
}