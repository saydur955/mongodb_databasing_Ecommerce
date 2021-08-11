import mongoose, { Schema, Document } from 'mongoose';
// import { ITeacher } from './teacherModal';

export interface IProduct extends Document {
  _id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  totalSold: number;
  stock: number;
  rating: number;
  ratingQuantity: number;
}

const productSchema : Schema = new Schema({
  _id: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  discount: {
    type: Number,
    require: true
  },
  totalSold: {
    type: Number,
    require: true
  },
  stock: {
    type: Number,
    require: true
  },
  rating: {
    type: Number,
    require: true
  },
  ratingQuantity: {
    type: Number,
    require: true
  }
});

// studentSchema.index({ email: 1 }, { unique: true}); // check schemma
// studentSchema.index({ firebaseId: 1 }, { unique: true}); // check schema

const Product = mongoose.model<IProduct>('Product', productSchema);
export { Product };