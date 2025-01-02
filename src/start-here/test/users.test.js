'use strict'
import { test } from 'node:test'
import assert from 'node:assert/strict'

import buildServer from '../index.js'

const test2 = async () => {
  const fastify = buildServer()

  const response = await fastify.inject({
    method: 'GET',
    url: '/users',
  })
  assert.equal(response.statusCode, 200)

  assert.deepEqual(response.json(), [
    { username: 'alice' },
    { username: 'bob' },
  ])
}
test2()

test('GET /users', async t => {
  await t.test('returns users', async () => {
    const fastify = buildServer()

    const res = await fastify.inject('/users')

    assert.equal(res.statusCode, 200)

    assert.deepEqual(res.json(), [
      { username: 'alice' },
      { username: 'bob' },
    ])
  })
})
