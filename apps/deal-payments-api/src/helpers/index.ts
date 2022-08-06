import mongoose from 'mongoose';

export const idToObjectId = (id: string) => new mongoose.Types.ObjectId(id);
