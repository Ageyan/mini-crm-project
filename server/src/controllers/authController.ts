import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from "express";

import { errorHandler } from '../utils/errorHandler.js';

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({email});

        if (!admin) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        const token = jwt.sign(
            { adminId: admin.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            token,
            admin: {
                id: admin.id,
                email: admin.email
            }
        })
    } catch (err) {
        errorHandler(err, res, 'when trying to log in');
    }
}