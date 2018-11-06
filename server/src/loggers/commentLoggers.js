const EventEmmiter = require('events').EventEmitter;
const commentEvents = new EventEmmiter();

const isTest = process.env.NODE_ENV === 'test'

commentEvents.on('post',
    comment => !isTest
        ? console.log(`Record added to database Comments. Record id: ${comment._id}`)
        : false
);

commentEvents.on('update',
    comment => !isTest
        ? console.log(`Record updated in database Comments. Record id: ${comment._id}`)
        : false
);

commentEvents.on('delete',
    comment => !isTest
        ? console.log(`Record deleted from database Comments. Record id: ${comment._id} `)
        : false
);

commentEvents.on('error',
    err => !isTest
        ? console.log(`An error occured while processing record Comment. Error: ${err}`)
        : false
);

module.exports = commentEvents;
