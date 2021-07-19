import DefaultException from "./DefaultException";

export default class NotFoundException implements DefaultException {
    type: string = "NOT_FOUND_EXCEPTION";
    msg: string = "User not found";
    statusCode: number = 404;
    
}