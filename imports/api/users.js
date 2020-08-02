import { Mongo } from 'meteor/mongo';

export const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
    Meteor.publish('users', function usersPublication(){
        return Users.find();
    });
}

Meteor.methods({
    'users.insert'(name, email, password, isAdmin){
        Users.insert({
            name: name,
            email: email,
            password: password,
            isAdmin: isAdmin
        });
    },
    'users.remove'(userId){
        Users.remove({
            '_id' : userId
        });
    },
    'users.update'(userId, name, email, password, isAdmin){
        Users.update(userId, {
            $set : {
                name: name,
                email: email,
                password: password,
                isAdmin: isAdmin
            }
        })
    }
});