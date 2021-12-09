import {
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	MethodNotAllowedError,
	NotAcceptableError,
	InternalServerError,
} from "routing-controllers";

export type ErrorStatus = 400 | 401 | 403 | 404 | 405 | 406 | 500;

export function assert(
	val: any,
	status: ErrorStatus,
	message: string
): asserts val {
	if (val) return;

	createError(status, message);
}

export const createError = (status: ErrorStatus, message: string) => {
	switch (status) {
		case 401:
			throw new UnauthorizedError(message);
		case 403:
			throw new ForbiddenError(message);
		case 404:
			throw new NotFoundError(message);
		case 405:
			throw new MethodNotAllowedError(message);
		case 406:
			throw new NotAcceptableError(message);
		case 500:
			throw new InternalServerError(message);
		default:
			throw new BadRequestError(message);
	}
};
