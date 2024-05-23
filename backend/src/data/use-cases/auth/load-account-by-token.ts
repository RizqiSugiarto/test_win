import { LoadAccountByToken } from '../../../domain/use-cases/auth/load-account-by-token'
import { Decrypter } from '../../protocols'

export class LoadAccountByTokens implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
  ) {}

  async load (accessToken: string): Promise<LoadAccountByToken.Result | null> {
    const token = await this.decrypter.decrypt(accessToken);
    if(token) return {
      id: token
    }
    return null
  }
}