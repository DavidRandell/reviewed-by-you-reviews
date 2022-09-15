const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

// Sample DB Data for Testing

const sampleReview =     {
  "title": "My All Time Favourite Movie",
  "movie-title": "Dances With Wolves",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}

//

chai.use(chaiHttp);

describe('Reviews', ()  => {

  // TEST INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          //res.should.have.status(404);
          res.should.be.html;
          done();
        });
  });

  // TEST NEW
  it('should display new form on /reviews/new GET', (done) => {
    chai.request(server)
      .get(`/reviews/new`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
  });


  // TEST SHOW
  it('should show a SINGLE review on /reviews/<id> GET', (done) => {
    var review = new Review(sampleReview);
    review.save((err, data) => {
      chai.request(server)
        .get(`/reviews/${data._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
        });
    });
  });
  
  // TEST CREATE
  // TEST SHOW
  // TEST EDIT
  // TEST UPDATE
  // TEST DELETE
});
