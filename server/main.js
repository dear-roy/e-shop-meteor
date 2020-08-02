import { Meteor } from 'meteor/meteor';

// Categories
import "../imports/api/categories";

// Products
import "../imports/api/products";

// Users
import "../imports/api/users";
import {Users} from "../imports/api/users";

Meteor.startup(() => {
    if (Users.find({isAdmin: true}).count() === 0) {
        Meteor.call('users.insert', 'Admin', 'admin@admin.com', 'password', true)
    }
});
