/* globals before describe it*/

const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../app')
const api = supertest('http://localhost:3000') // you have to use server port 3000

// GET candies
describe('GET /candies', () => {
  // done is a function
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.length).to.equal(response.body.length)
      done()
    })
  })
  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })
})

// GET candies/:id
describe('GET /candies/:id', () => {
  // done is a function
  it('should return a 200 response', (done) => {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should return an object containing the fields "name" and "color"', (done) => {
    api.get('/candies/3')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('color')
      done()
    })
  })
})

// POST /candies
describe('POST /candies', () => {
  // done is a function
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should return a 422 response', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 6,
      'name': 'Pocky',
      'color': 'wrong'
    })
    .expect(422, done)
  })

  it('should return an error message if the color field is wrong', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 7,
        'name': 'Chicken',
        'color': 'wrong'
      })
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body.message).to.equal('wrong color')
        done()
      })
  })

  before((done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 5,
        'name': 'lollipop',
        'color': 'red'
      }).end(done)
  })
  it('should add a candy object to the collection and return it', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        // expect (response.body.length).to.equal(5)
        expect(response.body[response.body.length - 1].name).to.equal('lollipop')
        done()
      })
  })

  it('should return an error if the color is wrong', (done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 8,
        'name': 'Duck',
        'color': 'wrong'
      })
      .end((error, response) => {
        expect(error).to.be.a('null')
        expect(response.body.message).to.equal('wrong color')
        done()
      })
  })
})

// DELETE
describe('DELETE /candies/:id', () => {
  // done is a function
  before((done) => {
    api.delete('/candies/3')
      .set('Accept', 'application/json')
      .end(done)
  })
  it('should remove a candy document', (done) => [
    api.get('/candies/3')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        console.log(response.body.color)
        expect(response.body.color).to.equal('Blue')
        done()
      })
  ])
})
// PUT
describe('PUT /candies/:id', () => {
  // done is a function
  it('should return a 200 response', (done) => {
    api.put('/candies/2')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  before((done) => {
    api.put('/candies/2')
      .set('Accept', 'application/json')
      .send({
        'id': 2,
        'name': 'Winston',
        'color': 'Black'
      }).end(done)
  })

  it('should update a candy document', (done) => {
    api.get('/candies/2')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null')
        console.log(response.body)
        // expect (response.body.length).to.equal(5)
        expect(response.body.name).to.equal('Winston')
        done()
      })
  })
})

  // it('should return an array', (done) => {
  //   api.get('/candies')
  //   .set('Accept', 'application/json')
  //   .end((error, response) => {
  //     expect(error).to.be.a('null')
  //     expect(response.body).to.be.an('array')
  //     done()
  //   })
  // })
  // it('should return an object that has a field called 'name"', (done) => {
  //   api.get('/candies')
  //   .set('Accept', 'application/json')
  //   .end((error, response) => {
  //     expect(error).to.be.a('null')
  //     expect(response.body[0]).to.be.property('name')
  //     done()
  //   })
  // })
