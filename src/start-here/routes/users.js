// routes/users.js
import S from 'fluent-json-schema'

/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
export default async function users(fastify) {
  /*   const schema = {
    response: {
      200: {
        type: 'array',
        properties: {
          username: { type: 'string' },
        },
      },
    },
  } */
  const schema = {
    response: {
      200: S.array().items(
        S.object().prop('username', S.string().required()),
      ),
    },
  }

  fastify.get('/users', { schema }, async req => {
    req.log.info('Users route called')
    return [{ username: 'alice' }, { username: 'bob' }]
  })
}
