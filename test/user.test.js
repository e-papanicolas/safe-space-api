import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import { db } from "../app/database/models/index.js";

chai.should();
chai.use(chaiHttp);

describe("User Integration Tests", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  describe("GET /user", () => {
    it("It should GET all users", (done) => {
      chai
        .request(app)
        .get("/user")
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("GET /user/:id ", () => {
    it("returns the user whose id was passed in the params", (done) => {
      chai
        .request(app)
        .get("/user/10")
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.id.should.equal(10);
          done();
        });
    });

    it("returns an error if the user does not exist", (done) => {
      chai
        .request(app)
        .get("/user/p")
        .send()
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property("message");
          done();
        });
    });
  });

  describe("POST /user", () => {
    it("should post a new user", (done) => {
      let payload = {
        username: "testuser1234",
        password: "testpassword",
        email: "test@email.com",
      };
      chai
        .request(app)
        .post("/user")
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("newUser");
          res.body.newUser.username.should.equal("testuser1234");
          done();
        });
    });
    it("should not post a user with missing fields", (done) => {
      let payload = {};
      chai
        .request(app)
        .post("/user")
        .send(payload)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.equal("Fields cannot be empty");
          done();
        });
    });
    it("should return an error if the username is already taken", (done) => {});
  });

  describe("POST /user/login", () => {});

  describe("PUT /user/:id", () => {});

  describe("DELETE /user/:id", () => {});

  afterAll(async () => {
    await db.sequelize.close();
  });
});
