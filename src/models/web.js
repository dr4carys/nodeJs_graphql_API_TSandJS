import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeMongoose } from 'graphql-compose-mongoose';

export const WebSchema = new Schema(
    {
        header_picture: {
            type: String,
            trim: true,
        },
        main_picture: {
            type: String,
            trim: true,
        },
        botton_picture: {
            type: String,
            trim: true,
        },
    },
    {
        collection: 'webs',
    }
);

WebSchema.plugin(timestamps);

WebSchema.index({ createdAt: 1, updatedAt: 1 });

export const Web = mongoose.model('Web', WebSchema);
export const WebTC = composeMongoose(Web);
