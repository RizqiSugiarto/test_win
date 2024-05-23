import { Authentication } from '../../../domain/use-cases'
import { HashComparer, Encrypter, GetByEmailUserRepository } from '../../protocols' 

export class Authentications implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: GetByEmailUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result | null> {
    const account = await this.loadAccountByEmailRepository.getByEmail(authenticationParams)
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        return {
          accessToken,
          name: account.name,
        }
      }
    }
    return null
  }
}