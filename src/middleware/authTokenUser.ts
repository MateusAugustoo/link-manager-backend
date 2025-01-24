import { FastifyRequest, FastifyReply } from 'fastify';
import admin from 'firebase-admin';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    reply.status(401).send({ message: 'Token not found' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (request as any).user = decodedToken;
  } catch (error) {
    reply.status(401).send({ message: 'Invalid token' });
  }
}
