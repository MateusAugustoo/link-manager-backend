import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { userRouters } from './routers/user'
import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, 'base64').toString('utf-8')
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

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