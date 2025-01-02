import * as jwt from '@fastify/jwt'
/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
async function authenticate(fastify, opts) {
  fastify.register(jwt, { secret: opts.JWT_SECRET })

  fastify.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
}

authenticate[Symbol.for('skip-override')] = true

export default authenticate
