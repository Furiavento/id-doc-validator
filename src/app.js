import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import rateLimit from '@fastify/rate-limit';
import formbody from '@fastify/formbody';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import validateRoutes from "./routes/validate.js";
import demoRoutes from "./routes/demo.js";
import fastifyStatic from "@fastify/static";
import 'dotenv/config';

const fastify = Fastify({
  logger: true
})

const __dirname = dirname(fileURLToPath(import.meta.url));

await fastify.register(swagger, {
  openapi: {
    info: { title: 'ID Doc Validator', version: '0.1.0' }
  }
})

await fastify.register(swaggerUI, {
  routePrefix: '/docs'
})

await fastify.register(rateLimit, {
  max: 60,
  timeWindow: '1 minute'
})

await fastify.register(formbody);

await fastify.register(fastifyStatic, {
  root: join(__dirname, 'views')
});

await fastify.register(validateRoutes, { prefix: '/api' });
await fastify.register(demoRoutes, { prefix: '/demo' });
fastify.get('/', (request, reply) => {
  reply.sendFile('index.html')
})
await fastify.listen({ port: process.env.PORT ?? 3000 });
