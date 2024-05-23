import { adaptMiddleware } from '../adapter'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware'

export const auth = adaptMiddleware(makeAuthMiddleware())