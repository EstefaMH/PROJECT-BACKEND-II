import UsersDTO from "../dto/usersDTO.js";
import { userService } from "../services/factory.js";



export class UserController {

    getAll = async (req, res) => {
        try {
            const result = await userService.getAll();
            res.sendSuccess(result);
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

}
