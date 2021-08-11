import mongoose, { Schema, Document } from 'mongoose';
// import { ITeacher } from './teacherModal';

export interface IUser extends Document {
  _id: number;
  name: string;
  email: string;
  gender: 'Male' | 'Female';
  location: string;
}

const userSchema : Schema = new Schema({
  _id: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

// studentSchema.index({ email: 1 }, { unique: true}); // check schemma
// studentSchema.index({ firebaseId: 1 }, { unique: true}); // check schema

const User = mongoose.model<IUser>('User', userSchema);
export { User };