/**
 * @type {import('fastify').FastifyPluginAsync}
 * */
export default fastify => {
  fastify.get('/prova', {}, () => ({ prova: true }))
}
