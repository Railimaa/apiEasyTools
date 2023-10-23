import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../../config/env';
import UsersRepository from '../../repositories/UsersRepository';
import { signin } from './dto/signin';
import { signup } from './dto/signup';


class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = signup.parse(req.body);

            const emailTaken = await UsersRepository.findyUnique(email);

            if (emailTaken) {
                return res.status(409).json({ message: 'This email is already in user' });
            }

            const hashedPassword = await hash(password, 12);

            const user = await UsersRepository.create({
                name,
                email,
                password: hashedPassword
            });


            const accessToken = jwt.sign({
                sub: user.id
            }, env.jwtSecret, {
                expiresIn: env.jwtExpiration
            });

            res.json({ accessToken: accessToken });
        }
        catch(err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json(err);
            } else {
                return res.status(500).json({ message: 'Error in server' });
            }
        }
    }

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = signin.parse(req.body);

            const user = await UsersRepository.findFirst(email);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await compare(password, user!.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }


            const accessToken = jwt.sign({
                sub: user.id
            }, env.jwtSecret, {
                expiresIn: env.jwtExpiration
            });


            res.json({ accessToken: accessToken });
        }
        catch(err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json(err);
            } else {
                return res.status(500).json({ message: 'Error in server' });
            }
        }
    }


}

export default new AuthController();
