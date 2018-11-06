const EventEmmiter = require('events').EventEmitter;
const movieEvents = new EventEmmiter();

const isTest = process.env.NODE_ENV === 'test'

movieEvents.on('post',
    movie => !isTest
        ? console.log(`Record added to database Movies. Record id: ${movie._id}`)
        : false
);

movieEvents.on('error',
    err => !isTest
        ? console.log(`An error occured while processing record Movie. Error: ${err}`)
        : false
);

module.exports = movieEvents;
