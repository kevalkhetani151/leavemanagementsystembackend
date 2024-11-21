import prisma from "../../config/db.config";
import { successResponse } from "../../helpers/responces";

class UpdatesLeaves {
    
    async updateCount(req: any,resp:any,next:any) {
        try {
            // Ensure the userId is available in the request object
            const userId = parseInt(req?.user?.userId);
            console.log("userid is here")
            console.log(typeof userId)

            // Validate userId
            if (!userId) {
                throw new Error('User ID is missing or invalid');
            }

            // Perform the raw SQL query to increment the leave balance
            const result = await prisma.$executeRaw`UPDATE user SET leave_balance = leave_balance + 1 WHERE user_id = 2`;

            // If the query does not return any affected rows, throw an error
            if (result === 0) {
                throw new Error('No rows were updated. Please check if the user exists.');
            }

            // Log success or perform other actions if necessary
            successResponse(resp, 'count sucessfully upadated');

        } catch (err: any) {
            // Log the error message and stack trace for debugging
            console.error('Error updating leave balance:', err.message);
            console.error(err.stack);

            // Throw a more general error to be caught by higher level code (e.g., Express error handler)
            throw new Error('Failed to update leave balance');
        }
    }
}

export default UpdatesLeaves;
