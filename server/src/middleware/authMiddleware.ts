import jwt from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';

import type { AuthRequest } from '../types/express.types.js';

export const protect = async(req: AuthRequest, res : Response, next: NextFunction)=> {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            req.admin = decoded as ({adminId : string});
            
            next();
        } catch(error) {
            res.status(401).json({ message: 'Authorization denied, token invalid' });
            return;
        }
    }
    
    if(!token) {
        res.status(401).json({
            message: 'Admin not authorized, token missing'
        });
        return;
    }
};