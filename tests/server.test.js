import request from "supertest";
import app from "../src/server.js";

describe("API endpoint", () => {
    it("GET / should return JSON message", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toMatch(/Hello/);
    });
});