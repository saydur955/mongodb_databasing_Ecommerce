/*

  The dataset was created by the faker npm package.
  That's for the amount of order that saved on DB is 100% wrong.
  This function will calculate the actual amount of a order.

*/

import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Order } from '../../models/orderModel';
// import { Utils } from '../Utils';

export const calculateOrderAmount = async (req: Request, res: Response) => {
  try {

    // const utils = new Utils();
    // check order id
    const orderID = req.params.orderId;
    if (!orderID) {
      throw new Error('invalid orderID')
    }

    const calculateAmount = await Order.aggregate([
      // match the order
      {
        $match: {
          _id: Types.ObjectId(orderID)
        }
      },
      // $unwind the order array
      {
        $unwind: '$order'
      },
      // calculate total order, if order array contains duplicate product id, then
      // calulate total sum of quantity. 
      // Though server won't allow to create duplicate product id on order array
      // 
      {
        $group: {
          _id: '$order.productId',
          quantity: {
            $sum: '$order.quantity'
          }
        }
      },
      // check products, to get actual price
      {
        $lookup: {
          from: 'products',
          let: { productID: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$productID']
                }
              }
            },
            {
              $project: {
                price: 1, discount: 1
              }
            }
          ],
          as: "productDetail"
        }
      },
      // unwind the productDetail, to get rid of array
      {
        $unwind: '$productDetail'
      },
      // calculate total amount of each product
      {
        $addFields: {
          procuctPrice: {
            $ceil: {
              $multiply: [
                '$quantity',
                {
                  $subtract: [
                    '$productDetail.price',
                    {
                      $multiply: [
                        '$productDetail.price',
                        { $divide: ['$productDetail.discount', 100] }
                      ]
                    }
                  ]
                }

              ]
            }
          }

        }
      },
      // calculate total amount
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$procuctPrice' }
        }
      },
      // prettyfiy the last result
      {
        $project: {
          _id: 0
        }
      }
    ]);

    // this calculateAmount is actual amount of a order.

    res.status(200).json({
      data: calculateAmount
    })

  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}