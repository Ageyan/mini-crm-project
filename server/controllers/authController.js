import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async(req, res) => {
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
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            token,
            admin: {
                id: admin.id,
                email: admin.email
            }
        })
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error when trying to log in' });
    }
}