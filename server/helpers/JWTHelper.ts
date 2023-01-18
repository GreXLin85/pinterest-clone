import jwt from 'jsonwebtoken';

const sign = (id: number) => {
    return jwt.sign({ id }, "123456789", {
        expiresIn: "24h"
    });
}

const verify = (token: string) => {
    return jwt.verify(token, "123456789", {
        algorithms: ["HS256"],
    }) as {
        id: number;
    };
}

export {
    sign,
    verify
}