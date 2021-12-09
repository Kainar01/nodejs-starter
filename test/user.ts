import "reflect-metadata";
import { Express } from "express";
import { configureContainer, createServer } from "../src/server";
import { config } from "../src/config.service";
import { UserEntity, UserRepository } from "../src/models/user.model";
import chai from "chai";
import chaiHttp from "chai-http";
import { Connection } from "typeorm";
import assert from "assert";

chai.use(chaiHttp);

const expect = chai.expect;
describe("GET", () => {
  let app: Express | null;
  let userRepository: UserRepository | null;

  before(async function () {
    this.timeout(10000);
    const container = await configureContainer(config);
    app = await createServer(container);

    // clean db
    const connection = container.resolve(Connection);
    userRepository = connection.getRepository(UserEntity);
  });

  after((_done) => {
    app = null;
    process.exit(0);
  });

  it("it should delete all the users", async () => {
    await userRepository!.delete({});
    assert.equal((await userRepository!.find()).length, 0);
  });

  it("it should create a user", function (done) {
    chai
      .request(app)
      .post("/users/register")
      .send({ email: "test@gmail.com", password: "Password1234" })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  var token: string;
  it("it should login a user", function (done) {
    chai
      .request(app)
      .post("/users/login")
      .send({ email: "test@gmail.com", password: "Password1234" })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        token = res.body.access;
        done();
      });
  });

  it("it should create a record", function (done) {
    chai
      .request(app)
      .post("/records")
      .set({ Authorization: token })
      .send({ distance: 1002, time: 400.3, date: new Date().toISOString() })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});
