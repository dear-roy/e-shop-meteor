import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';

import { Categories } from '../../../imports/api/categories';



if (Meteor.isServer) {

    describe('Categories', () => {

        describe('methods', () => {
            let category;

            beforeEach( () => {
                Categories.remove({});

                category = Categories.insert({
                    name: 'Testing Category',
                    createdAt: new Date()
                });
            });

            // Test for product query
            it('can query category', () => {
                assert.isAbove(Categories.find({name: 'Testing Category'}).count(), 0);
            });

            // Test for product delete
            it('can delete category', () => {
                const deleteCategory = Meteor.server.method_handlers['categories.remove'];
                const categoryId = {category};
                deleteCategory.apply(categoryId, [category]);
                assert.strictEqual(Categories.find().count(), 0);
            });

            it('should be there', function () {
                //expect($('#productAmount').isDisplayed()).to.eventually.be.true;
            });

        });

    });

}

if (Meteor.isClient) {

    describe('Categories', () => {

        describe('methods', () => {

            it("running on client server", () => {
                assert.strictEqual(Meteor.isServer, false);
            });

        });

    });

}
