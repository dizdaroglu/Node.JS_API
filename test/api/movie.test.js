const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");


chai.use(chaiHttp);

let token;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'fdizdaroglu', password: 'furkan123' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET movies', () => {
        it('it should Get all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });
    describe('/POST movies', () => {
        const movie = {
            title: 'test title',
            category: 'test category',
            country: 'test country',
            year: 1,
            imdb_score: 1,
            director_id: '5c82c53c187bf30a8488bcf4'
        };
        it('it should POST all the movies', (done) => {
            chai.request(server)
                .post('/api/movies')
                .set('x-access-token', token)
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('director_id');

                });
        })
    })
});