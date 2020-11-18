import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/web_db';

module.exports = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            createIndexes: true,
        });
        console.log('DB connected...')
    } catch (e) {
        console.log('Connection failed', e);
        process.exit(1);
    }
};

