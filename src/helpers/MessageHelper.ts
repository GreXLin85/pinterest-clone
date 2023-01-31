import { Response } from "express";

export default (data: any, isError: boolean, res: Response) => {
    if (isError) {
        if (data.includes("Unique constraint failed")) {
            return res.status(isError ? 400 : 200).send({
                data: "Record already exists",
                error: isError
            });
        }
    }
    
    return res.status(isError ? 400 : 200).send({
        data,
        error: isError
    });
}