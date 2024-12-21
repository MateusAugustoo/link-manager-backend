import { FastifyRequest, FastifyReply } from 'fastify'
import admin from 'firebase-admin'

interface AuthenticatedRequest extends FastifyRequest {
  user: any;
}

export async function authMiddleware(request: AuthenticatedRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.split(' ')[1]

  if (!token) {
    reply.status(401).send({ message: 'Token not found' })
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    request.user = decodedToken

  } catch (error) {
    reply.status(401).send({ message: 'Invalid token' });
  }
}