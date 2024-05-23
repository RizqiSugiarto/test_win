import { makeLoadAccountByTokens } from '../use-case/db'
import { Middleware } from '../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/middleware/auth-middleware'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeLoadAccountByTokens())
}