import { append } from 'vary'
/**
 * @type {import('fastify').FastifyPluginAsync}
 * */

export default fastify => {
  fastify.route({
    method: 'GET',
    url: '/version',
    constraints: { version: '1.0.0' },
    handler: function (request, reply) {
      reply.send({ message: 'Hello from version 1.x' })
    },
  })

  fastify.route({
    method: 'GET',
    url: '/version',
    constraints: { version: '2.x' },
    handler: function (request, reply) {
      reply.send({ message: 'Hello from version 2.x' })
    },
  })

  fastify.get(
    '/version',
    { constraints: { version: '3.x' } },
    async (request, reply) => {
      reply.send({ message: 'Hello from version 3.x' })
    },
  )

  fastify.addHook('onSend', (req, reply, payload, done) => {
    if (req.headers['accept-version']) {
      // or the custom header you are using
      let value = reply.getHeader('Vary') || ''
      const header = Array.isArray(value)
        ? value.join(', ')
        : String(value)
      if ((value = append(header, 'Accept-Version'))) {
        // or the custom header you are using
        reply.header('Vary', value)
      }
    }
    done()
  })
}
