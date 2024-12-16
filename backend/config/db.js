import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Ensure process.env.MONGO_URI is loaded correctly
        if (!process.env.MONGO_URI) {
            throw new Error('MongoDB URI is missing in environment variables.');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;
