process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { Movie } = require('../src/models');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

let apikey;
let movie_id;

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

describe('Movie', () => {

    before( done => {
        Movie.deleteMany({}, err => {
            done()
        })
    });

    after( done => {
        Movie.deleteMany({}, err=> {
            done();
        })
    });

    describe('Get All Movies', () => {

        it('should get all the movies', done => {

            chai.request(server)
                .get(`/movies?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done()
                    }
                )

        });

        it('should get not be able to the movies without api key', done => {

            chai.request(server)
                .get(`/movies`)
                .end(
                    (err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        done()
                    }
                )

        });

        it('should get not be able to the movies with bad api key', done => {

            chai.request(server)
                .get(`/movies?apikey=413413412`)
                .end(
                    (err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        done()
                    }
                )

        });

    });

    describe('Add Movie', () => {

        it('should add movie to database', done => {

            chai.request(server)
                .post(`/movies?apikey=${apikey}`)
                .send({ id: 'tt3896198' })
                .end(
                    (err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('Title');
                        res.body.should.have.property('Year');
                        res.body.should.have.property('Released');
                        movie_id = res.body._id;
                        done();
                    }
                )

        });

        it('should not add movie with the same id to database', done => {

            chai.request(server)
                .post(`/movies?apikey=${apikey}`)
                .send({ id: 'tt3896198' })
                .end(
                    (err, res) => {
                        res.should.have.status(400)
                        res.body.should.be.a('object');
                        res.body.message.should.be.a('string');
                        done();
                    }
                )

        });

        it('should not add movie without id / title to database', done => {

            chai.request(server)
                .post(`/movies?apikey=${apikey}`)
                .send({})
                .end(
                    (err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        res.body.message.should.be.a('string');
                        done();
                    }
                )

        });

    });

    describe('Get All Movies after adding element', () => {

        it('should get all the movies', done => {

            chai.request(server)
                .get(`/movies?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1)
                        done()
                    }
                )

        });

    });

    describe('Get One Movie', () => {

        it('should get one movie from database', done => {

            chai.request(server)
                .get(`/movies/${movie_id}?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    }
                )

        })

        it('should not get a movie with bad id', done => {

            chai.request(server)
                .get(`/movies/e7361r23?apikey=${apikey}`)
                .end(
                    (err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message')
                        done();
                    }
                )

        })

    });

});
