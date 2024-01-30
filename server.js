import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const queryParams = request.query.search;

  const allVideos = await database.list(queryParams);

  return allVideos;
});

server.put("/videos/:id", async (request, reply) => {
  const { id } = request.params;
  const { title, description, duration } = request.body;

  await database.update(id, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const { id } = request.params;

  await database.delete(id);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
