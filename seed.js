/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Album = Promise.promisifyAll(mongoose.model('Album'));


var seedUsers = function() {

    var users = [{
        firstName: 'test',
        lastName: 'test',
        email: 'testing@fsa.com',
        password: 'password',
    }, {
        firstName: 'Barack',
        lastName: 'Obama',
        photo: 'http://www.quickmeme.com/img/ba/ba8d26d434d56f5e98c04e5223ca3e17659005a34297440a31a0e12469e1a568.jpg',
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true,
    }, {
        firstName: 'Cooper',
        lastName: 'Zelenetz',
        photo: 'http://ak-hdl.buzzfed.com/static/2014-05/enhanced/webdr08/7/11/enhanced-buzz-9911-1399476833-28.jpg',
        email: 'cooper@gmail.com',
        password: 'cooper',
        isAdmin: true,
    }, {
        firstName: 'Led',
        lastName: 'Zeppelin',
        photo: 'http://cps-static.rovicorp.com/3/JPG_400/MI0003/680/MI0003680454.jpg?partner=allrovi.com',
        email: 'zep@gmail.com',
        password: 'Led',
        isAdmin: true,
    }, {
        firstName: 'Taylor',
        lastName: 'Swift',
        photo: 'https://usatlife.files.wordpress.com/2014/05/1taylorswift-mug.jpg?w=1000&h=1405',
        email: 'taylor@gmail.com',
        password: 'Swift',
        isAdmin: true,
    }];



    return User.createAsync(users);

};

var seedAlbums = function(){
    var albums = [{
        artistName: "Michael Jackson",
        album: "Thriller",
        genre: ["R&B"],
        price: "27.16",
        imgUrl: "http://ecx.images-amazon.com/images/I/61qTE9kINgL.jpg",
        year: 1982
    }, {
        artistName: "Leon Bridges",
        album: "Coming Home",
        genre: ["Soul"],
        price: "20.00",
        imgUrl: "http://static1.squarespace.com/static/54fdea6de4b018047dada8af/t/5552050ee4b03b3ccda57c18/1431438608081/",
        year: 2015
    }, {
        artistName: "The Beatles",
        album: "Abbey Road",
        genre: ["Pop"],
        price: "37.00",
        imgUrl: "http://d817ypd61vbww.cloudfront.net/sites/default/files/styles/media_responsive_widest/public/tile/image/AbbeyRoad.jpg?itok=BgfH98zh",
        year: 1969
    },  {
        artistName: "Pink Floyd",
        album: "Dark Side of the Moon",
        genre: ["Rock"],
        price: "24.43",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
        year: 1973
    },  {
        artistName: "Beyoncé",
        album: "Beyoncé",
        genre: ["R&B"],
        price: "25.50",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Beyonc%C3%A9_-_Beyonc%C3%A9.svg",
        year: 2014
    },  {
        artistName: "Led Zeppelin",
        album: "IV",
        genre: ["Clasic Rock"],
        price: "23.84",
        imgUrl: "http://ecx.images-amazon.com/images/I/61qTE9kINgL.jpg",
        year: 1971
    }, {
        artistName: "Kanye West",
        album: "My Beautiful Dark Twisted Fantasy",
        genre: ["Pop"],
        price: "25.85",
        imgUrl: "https://upload.wikimedia.org/wikipedia/en/b/be/MBDTF_ALT.jpg",
        year: 2010
    }, {
        artistName: "Joni Mitchel",
        album: "Feeling Blue",
        genre: ["Folk Rock"],
        price: "32.00",
        imgUrl: "http://blog.thecurrent.org/files/2015/04/Blue-Joni-Mitchell.jpg",
        year: 1971
    }];

    return Album.createAsync(albums);
}


connectToDb.then(function() {
    mongoose.connection.db.dropDatabase(function() {
        User.findAsync({}).then(function(users) {
            if (users.length === 0) {
                // return seedUsers();
                return Promise.all([seedUsers(), seedAlbums()])
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                process.kill(0);
            }
        }).then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
    });
});