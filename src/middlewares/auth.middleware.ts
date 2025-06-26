import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { env } from "@/env";
import { NotFoundError, UnauthorizedError } from "@/helpers/http-errors";

export default function authMiddleware() {
	return (req: Request, _res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ").at(-1);
		if (!token) throw new NotFoundError("Token not found");

		let payload: jwt.JwtPayload | string;

		try {
			payload = jwt.verify(token, env.JWT_SECRET);
		} catch {
			throw new UnauthorizedError("Invalid token");
		}

		if (typeof payload === "string") {
			throw new UnauthorizedError("Invalid token");
		}

		if (!payload.sub) {
			throw new UnauthorizedError("Invalid token");
		}

		req.user = {
			id: payload.sub,
		};

		return next();
	};
}
