var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");


    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test',
        image: 'images/Uthapizza.png',
        category: 'mains',
        label: 'mild',
        price: '$4.99',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'Matt Daemon'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test',
                        label: 'Updated Hot'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);
                    });
                });
        }, 3000);
    });


    // create a new promotion
    Promotions.create({
        name: 'Weekend Grand Buffet',
        description: 'Featuring . . .',
        image: 'images/buffet.png',
        price: '9.19',
    }, function (err, promo) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promo);

        var id = promo._id;

        // get all the promotions
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Featuring...',
                        label: 'Updated Label'
                    }
                }, {
                    new: true
                })
                .exec(function (err, promo) {
                    if (err) throw err;
                    console.log('Updated Promotion!');
                    console.log(promo);
                });
        }, 3000);
    });


    // create a new leader
    Leadership.create({
        name: 'Peter Pan',
        description: 'Our CEO, Peter, ...',
        image: 'images/alberto.png',
        designation: 'chief Epicurious Officer',
        abbr: 'CEO'
    }, function (err, leader) {
        if (err) throw err;
        console.log('Leadership created!');
        console.log(leader);

        var id = leader._id;

        // get all the leadership
        setTimeout(function () {
            Leadership.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated description ...',
                        abbr: 'Updated COO'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Updated Leadership!');
                    console.log(leader);
                });
        }, 3000);
    });

    setTimeout(function(){
        db.collection('Dishes').drop(function(){
            db.collection('Promotions').drop(function(){
                db.collection('Leadership').drop(function(){
                    db.close();
                })
            });
        });
    }, 12000);
});