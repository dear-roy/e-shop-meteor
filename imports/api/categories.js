import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection('categories');

if (Meteor.isServer) {
    Meteor.publish('categories', function categoriesPublication() {
        return Categories.find();
    });
}

Meteor.methods({
    'categories.find'() {
        Categories.find().fetch();
    },
    'categories.findOne'(id) {
        Categories.findOne({
            "_id" : id
        });
    },
    'categories.insert'(name) {
        Categories.insert({
            name: name,
            createdAt: new Date() // current time
        });
    },
    'categories.remove'(categoryId) {
        Categories.remove({
            "_id" : categoryId
        });
    },
});