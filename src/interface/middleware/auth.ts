import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../../helpers/responces";
import { CustomError } from "../../helpers/customeerror";

import { ErrorCodes } from "../../constent/code"; 

function verifyToken(req: Request, resp: Response, next: NextFunction) {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("token is comming")
    console.log(token)
    if (!token) {
        return errorResponse(resp,"Your session has expired ! please login again", "token is not found" , 401);
    }
    try {
       const decoded = jwt.verify(token, "b1f3d9e8234c57f8a0d2e4a5c6b7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7");
       /* const decoded = Jwttoken.verifyJwt(token, "b1f3d9e8234c57f8a0d2e4a5c6b7e8f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7") */
    
    // @ts-ignore
       req.user = decoded
       console.log("decoded data");
        console.log(decoded);
        next(); // Proceed to the next middleware or route handler
    } catch (err: any) {
        if (err instanceof CustomError) {
          return errorResponse(resp, err.message, [{ message: err.message }], err.statusCode);
        }
        else if (err instanceof Error) {
          const customError = new CustomError(err.message, 500, ErrorCodes.INTERNAL_SERVER_ERROR);
          return errorResponse(resp, 'An unexpected error occurred', [{ message: customError.message }], customError.statusCode);
        }
        else {
          const customError = new CustomError('Unknown error occurred', 500, ErrorCodes.INTERNAL_SERVER_ERROR);
          return errorResponse(resp, 'An unexpected error occurred', [{ message: customError.message }], customError.statusCode);
        }
      }
}

export default verifyToken;
