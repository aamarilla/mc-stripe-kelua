const chai = require('chai');
const chaiHttp = require('chai-http');
const mocha = require('mocha');
const server = require('./server');

const should = chai.should();

chai.use(chaiHttp);

describe('Healt', () => {
    describe('GET /health', () => {
        it('Comprueba que esté conectado el servidor', (done) => {
            chai.request(server.localhost).get('/health').end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    })
})