import DefaultException from "./DefaultException";

export default class ConflictException implements DefaultException {
    type: string = "CONFLICT_EXCEPTION";
    msg: string = "User already exists";
    statusCode: number = 409;
}
