/**
 * A custom library to establish a database connection
 */
'use strict';
var mongoose = require('mongoose');

var db = function () {
    return {

        /**
         * Open a connection to the database
         * @param conf
         */
        config: function (conf) {

            console.log("process.env.MONGOHQ_URL: " + process.env.MONGOHQ_URL);
            if(process.env.MONGOHQ_URL){
                mongoose.connect(process.env.MONGOHQ_URL);
            }else{
                mongoose.connect('mongodb://' + conf.host + '/' + conf.database);    
            }
            
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open');
            });
        }
    };
};

module.exports = db();