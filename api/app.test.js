import { app } from "./app.js";
import request from "supertest";

it("GET / --> get tracking numbers", () => {
  return request(app)
    .get("/api/?label_id=08-")
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => {
      expect(response.body.data).toEqual(
        expect.arrayContaining([
          {
            id: expect.any(Number),
            label_id: expect.any(String),
            shipping_tracking_code: expect.any(String),
          },
        ])
      );
    });
});

it("GET / -- 400 if query contains invalid characters", () => {
  return request(app)
    .get("/api/?label_id=08-A")
    .expect(400)
    .then((response) => {
      expect(response.body.error).toEqual(
        "label_id needs to be XX-XX-XXX where X is an number"
      );
    });
});

it("GET / -- 400 if less than 3 characters provided", () => {
  return request(app)
    .get("/api/?label_id=08")
    .expect(400)
    .then((response) => {
      expect(response.body.error).toEqual(
        "label_id needs to be more than 3 characters"
      );
    });
});

it("GET / -- 404 if no tracking number for label ID", () => {
  return request(app).get("/api/?label_id=08-080-808").expect(404);
});
