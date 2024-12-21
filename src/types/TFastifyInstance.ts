import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export type TFastifyInstance = FastifyInstance<
RawServerDefault,
RawRequestDefaultExpression,
RawReplyDefaultExpression,
FastifyBaseLogger,
ZodTypeProvider
>