process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { Comment } = require('../src/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

let apikey;
let comment_id;

describe('ApiKey', () => {
    describe('Get Api Key', () => {
        it('should return an api key', done => {
            chai.request(server)
                .get('/apikey')
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.key.should.be.a('string');
                        apikey = res.body.key
                        done();
                    }
                )
        });
    })
})

describe('Comment', () => {

    before( done => {
        Comment.deleteMany({}, err => {
            done();
        })
    });

    after( done => {
        Comment.deleteMany({}, err=> {
            done();
        })
    });

    describe('Get All Comments', () => {

        it('should get all the comments', done => {

            chai.request(server)
                .get(`/comments?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done()
                    }
                )

        })

    });

    describe('Add Comment', () => {

        it('should add comment to database', done => {

            chai.request(server)
                .post(`/comments?apikey=${apikey}`)
                .send({ text: 'test text' })
                .end(
                    (err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('text');
                        res.body.should.have.property('lastModified');
                        comment_id = res.body._id;
                        done();
                    }
                )

        });

        it('should not add comment without text to database', done => {

            chai.request(server)
                .post(`/comments?apikey=${apikey}`)
                .send({})
                .end(
                    (err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.message.should.be.a('string');
                        done();
                    }
                )

        });

    });

    describe('Get All Comments', () => {

        it('should get all the comments', done => {

            chai.request(server)
                .get(`/comments?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done()
                    }
                )

        })

    });

    describe('Get One Comment', () => {

        it('should get one comment from database', done => {

            chai.request(server)
                .get(`/comments/${comment_id}?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    }
                )

        })

    });

    describe('Update One Comment', () => {

        it('should update a comment', done => {
            chai.request(server)
                .put(`/comments/${comment_id}?apikey=${apikey}`)
                .send({ text: 'updated text' })
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('_id');
                        res.body._id.should.be.eql(comment_id);
                        done();
                    }
                )
        })

    });

    describe('Delete One Comment', () => {

        it('should delete a comment', done => {
            chai.request(server)
                .delete(`/comments/${comment_id}?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('_id');
                        res.body._id.should.be.eql(comment_id);
                        done();
                    }
                )
        })

    });

});
