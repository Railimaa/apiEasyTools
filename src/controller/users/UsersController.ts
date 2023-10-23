import { Request, Response } from 'express';
import UsersRepository from '../../repositories/UsersRepository';


class UsersController {
    async me(req: Request, res: Response) {
        const userId = req.userId;

        const user = await UsersRepository.getUserById(userId);


        res.json(user);
    }
}

export default new UsersController();
