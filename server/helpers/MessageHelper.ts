import { Response } from "express";

export default (data: any, isError: Boolean, res: Response) => {
    return res.status(isError ? 400 : 200).send({
        data: data,
        error: isError
    });
}