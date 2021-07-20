import DefaultException from "./DefaultException";

export default class InvalidAuthException implements DefaultException {
    type: string = "INVALID_CREDENTIALS";
    msg: string = "Credentials not matching";
    statusCode: number = 401;
}