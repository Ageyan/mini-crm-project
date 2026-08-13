import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import Admin from './models/Admin.js';

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Подключено к базе данных...');

        const existingAdmin = await Admin.findOne({ email: 'admin@crm.com' });

        if (existingAdmin) {
            console.log('The admin already exists!');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        await Admin.create({
            email: 'admin@crm.com',
            password: hashedPassword,
        });

        console.log('✅ The default admin has been successfully created!');
        console.log('Email: admin@crm.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
};

seedAdmin();