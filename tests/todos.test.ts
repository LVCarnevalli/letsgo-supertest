import supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com/");

describe("Todos endpoint", () => {
  test("should return a 200 status code", async () => {
    const response = await request.get("todos/1");

    expect(response.statusCode).toBe(200);
  });

  test("should have the correct response headers", async () => {
    const response = await request.get("todos").set("Accept", "application/json");

    expect(response.headers["content-type"]).toContain("application/json");
  });

  test("should set the todo item to completed", async () => {
    const response = await request.put("todos/1").send({
      completed: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ completed: true, id: 1 });
  });

  test("should delete an existing todo", async () => {
    const response = await request.delete("todos/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({});
  });
});
