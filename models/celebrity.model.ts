import { Schema, model, models } from 'mongoose';

const celebritySchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        picture: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const CelebrityModel = models.Celebrity || model('Celebrity', celebritySchema);

export default CelebrityModel;
