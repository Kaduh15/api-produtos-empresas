import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { HttpError } from "@/helpers/http-errors";
import { HttpStatus } from "@/helpers/http-status";

const errorMiddleware: ErrorRequestHandler = (
	error,
	_request,
	response,
	_next,
) => {
	if (error instanceof ZodError) {
		const errors: {
			[k: string]: string;
		} = {};

		error.issues.forEach((issue) => {
			errors[issue.path[0]] = issue.message;
		});

		response.status(HttpStatus.BAD_REQUEST).json({ errors });
		return;
	}

	if (error instanceof HttpError) {
		const status = error.status;
		const message = error.message;
		response.status(status).send({
			error: message,
		});
		return;
	}

	response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
		error: "Something went wrong",
	});
};

export default errorMiddleware;
