
/**
 * Fastify plugin that registers the POST /validate route.
 * Dynamically loads the country validator module and dispatches
 * to the appropriate function based on docType.
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async function validateRoutes(fastify) {
  fastify.post('/validate', {
    schema: {
      body: {
        type: 'object',
        required: ['country', 'docType', 'value'],
        properties: {
          country: { type: 'string' },
          docType: { type: 'string' },
          value: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { country, docType, value } = request.body;
      const fnName = `validate${docType.toUpperCase()}`;
      const mod = await import(`../validators/${country}.js`);
      if (typeof mod[fnName] !== 'function') {
        return reply.code(400).send({ error: 'Tipo de documento no soportado' });
      }
      const res = mod[fnName](value)
      return reply.code(200).send({ valid: res, country: country, docType: docType, value: value });
    } catch {
      return reply.code(400).send({ error: 'País no soportado' });
    }
  })
}
