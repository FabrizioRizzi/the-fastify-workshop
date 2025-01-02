import { S } from 'fluent-json-schema'
import errors from 'http-errors'

const schema = {
  body: S.object()
    .prop('username', S.string().required())
    .prop('password', S.string().required()),
  response: {
    200: S.object().prop('token', S.string().required()),
  },
}

/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
export default fastify => {
  fastify.post(
    '/login',
    { schema },
    /**
     * @type {import('fastify').RouteHandler<{ Body: { username: string; password: string } }>}
     * */ (req, reply) => {
      const { username, password } = req.body

      if (username !== password) {
        throw errors.Unauthorized()
      }
      req.log.info(`User ${username} trying to login`)
      const token = fastify.jwt.sign({ username })
      reply.send({ token })
    },
  )
}
