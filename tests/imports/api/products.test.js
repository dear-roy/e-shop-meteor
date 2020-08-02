import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Products } from '../../../imports/api/products';



if (Meteor.isServer) {

    describe('Products', () => {

        describe('methods', () => {

            const categoryId = Random.id();
            let product;

            beforeEach( () => {
                Products.remove({});

                product = Products.insert({
                    name: 'Testing Product',
                    price: 100,
                    categoryId: categoryId,
                    description: 'This is a dummy description'
                });
            });

            // Test for product query
            it('can query product', () => {
                assert.isAbove(Products.find({name: 'Testing Product'}).count(), 0);
            });

            // Test for product delete
            it('can delete product', () => {
                const deleteProduct = Meteor.server.method_handlers['products.remove'];
                const productId = {product};
                deleteProduct.apply(productId, [product]);
                assert.strictEqual(Products.find().count(), 0);
            });

        });

    });

}

if (Meteor.isClient) {

    describe('Products', () => {

        describe('methods', () => {

            it("running on client server", () => {
                assert.strictEqual(Meteor.isServer, false);
            });

        });

    });

}