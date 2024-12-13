import { Response } from "express";
import { jwtDecode } from "jwt-decode";

export function getJWTExpiry(jwtToken: string) {
    if (!jwtToken) {
        return null;
    }
    interface JwtDecode {
        name: string;
        email: string;
        roles: Array<number>;
        iat: number;
        exp: string;
    }
    const decoded: JwtDecode = jwtDecode(jwtToken);
    return whenWillExpire(decoded.exp);
}

export function whenWillExpire(exp: string): number {
    return Number(exp) - Number(Date.now().toString().slice(0, 10));
}

export function throwError(status: number, errorMsg: string, res: Response) {
    return res.status(status).json({ message: errorMsg })
}