import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

const connectDB = () => {
    if (mongoose.connections[0].readyState) {
        // console.log(`MongoDB is already connected to ${mongoose.connections[0].name} database..!`);
        return;
    }
    if (process.env.MONGODB_URI) {
        mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                // console.log(`MongoDB connected to ${mongoose.connections[0].name} database..!`);
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

export default connectDB;
