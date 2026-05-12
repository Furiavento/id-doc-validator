import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import validateRoutes from "./routes/validate.js";

const fastify = Fastify({
  logger: true
})


await fastify.register(swagger, {
  openapi: {
    info: { title: 'ID Doc Validator', version: '0.1.0' }
  }
})

await fastify.register(swaggerUI, {
  routePrefix: '/docs'
})

await fastify.register(validateRoutes, { prefix: '/api' })

await fastify.listen({ port: process.env.PORT ?? 3000 })
