import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
    Meteor.publish('products', function productsPublication() {
        return Products.find();
    });
}

Meteor.methods({
    'products.insert'(name, price, categoryId, description) {
        Products.insert({
            name: name,
            price: price,
            categoryId: categoryId,
            description: description
        });
    },
    'products.remove'(productId) {
        Products.remove({
            "_id" : productId
        });
    },
    'products.update'(id, name, price, categoryId, description) {
        Products.update(
            id,{
                $set : {
                    name: name,
                    price: price,
                    categoryId: categoryId,
                    description: description
                }
            }
        );
    },
});