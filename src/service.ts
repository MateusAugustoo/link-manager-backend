import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { userRouters } from './routers/user'


const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {origin: '*'})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Link Manager API',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/', async () => {
  return 'Hello World'
})

app.register(userRouters)

app.listen({ port: 3333 }).then(() => {
  app.log.info('HTTP server listening on port 3333')
})