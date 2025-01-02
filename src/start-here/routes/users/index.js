// routes/users.js
import S from 'fluent-json-schema'
import SQL from '@nearform/sql'

/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
export default async function users(fastify) {
  const schema = {
    response: {
      200: S.array().items(
        S.object()
          .prop('username', S.string().required())
          .prop('id', S.integer().required()),
      ),
    },
  }

  fastify.get(
    '/',
    { onRequest: [fastify.authenticate], schema },
    async req => {
      const sql = SQL`SELECT * FROM users`

      const { rows: users } = await fastify.pg.query(sql)

      return users
    },
  )
}
