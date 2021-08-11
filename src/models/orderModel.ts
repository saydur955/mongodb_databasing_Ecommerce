import mongoose, { Schema, Document } from 'mongoose';
// import { ITeacher } from './teacherModal';

export interface IOrder extends Document {
  userId: number;
  pickingAddress: string;
  amount: number;
  deliveryCharge: number;
  paymentMethod: 'Cash_on_delivery' | 'Rocket' | 'Bkash' | 'Nagad';
  order: {
    productId: number;
    quantity: number;
  }[],
  orderAt: Date;
}

const orderSchema : Schema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  pickingAddress: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  deliveryCharge: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  order: [
    {
      productId: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  orderAt: {
    type: Date,
    required: true
  }

});

orderSchema.index({ userId: 1 });
// studentSchema.index({ firebaseId: 1 }, { unique: true}); // check schema

const Order = mongoose.model<IOrder>('Order', orderSchema);
export { Order };