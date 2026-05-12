
/**
 * Fastify plugin that registers the POST /validate route.
 * Dynamically loads the country validator module and dispatches
 * to the appropriate function based on docType.
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async function demoRoutes(fastify) {
  fastify.post('/validate', {},
    async (request, reply) => {
      try {
        const { country, docType, value } = request.body;
        const fnName = `validate${docType.toUpperCase()}`;
        const mod = await import(`../validators/${country}.js`);
        if (typeof mod[fnName] !== 'function') {
          return reply.type('text/html').send('<p>Tipo de documento no soportado</p>')
        }
        const res = mod[fnName](value)
        return reply.type('text/html').send(`<p>Resultado: ${res}</p>`)
      } catch {
        return reply.type('text/html').send('<p>País no soportado</p>')
      }
    })
}
