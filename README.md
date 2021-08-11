# MongoDB Databasing (Ecommerce)

This repository on Mongodb operation.
I've create a dummy data set using faker package.
This Database contains three collection ( user, order, product ) .
You can find all data on /data directory.

Mongo operation are located on ./src/controller directory and rest directory are just basic setup to start server.

## Orders
##### 01_calculateOrderAmount:
The data was created with faker package. That's for the data of order collection is 100% wrong. Now our goal is calculate the amount of order means, get real price from product collection and then calculate total amount of order.