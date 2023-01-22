import { Response } from "express";

export default (data: any, isError: boolean, res: Response) => {
    return res.status(isError ? 400 : 200).send({
        data,
        error: isError
    });
}