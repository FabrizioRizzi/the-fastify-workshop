import S from 'fluent-json-schema'
import SQL from '@nearform/sql'
import errors from 'http-errors'

const schema = {
  response: {
    200: S.object().prop('username', S.string().required()),
  },
}

const createUserSchema = {
  body: S.object().prop('username', S.string().required()),
}

const deleteUserSchema = {
  params: S.object().prop('id', S.string().required()),
}

const updateUserSchema = {
  body: S.object().prop('username', S.string().required()),
  params: S.object().prop('id', S.string().required()),
}

/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
export default async function user(fastify) {
  fastify.get(
    '/',
    {
      onRequest: [fastify.authenticate],
      schema,
    },
    async req => req.user,
  )

  fastify.post(
    '/create-user',
    {
      onRequest: [fastify.authenticate],
      schema: createUserSchema,
    },
    async req => {
      const { username } = req.body
      const sql = SQL`INSERT INTO users (username) VALUES (${username}) RETURNING id, username`

      const {
        rows: [user],
      } = await fastify.pg.query(sql)

      return user
    },
  )

  fastify.put(
    '/update-user/:id',
    {
      onRequest: [fastify.authenticate],
      schema: updateUserSchema,
    },
    async req => {
      const { id } = req.params
      const { username } = req.body
      const sql = SQL`UPDATE users SET username = ${username} WHERE id = ${id} RETURNING id, username`

      const {
        rows: [user],
      } = await fastify.pg.query(sql)

      if (!user) throw errors.NotFound()

      return user
    },
  )

  fastify.delete(
    '/delete-user/:id',
    {
      onRequest: [fastify.authenticate],
      schema: deleteUserSchema,
    },
    async req => {
      const { id } = req.params
      const sql = SQL`DELETE FROM users WHERE id = ${id} RETURNING id, username`

      const {
        rows: [user],
      } = await fastify.pg.query(sql)

      if (!user) throw errors.NotFound()
      return user
    },
  )
}
