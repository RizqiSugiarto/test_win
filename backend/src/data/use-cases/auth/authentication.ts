import { Authentication } from "../../../domain/use-cases";
import {
  HashComparer,
  Encrypter,
  GetByEmailUserRepository,
} from "../../protocols";

export class Authentications implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: GetByEmailUserRepository, // Repository untuk mengambil akun berdasarkan email
    private readonly hashComparer: HashComparer, // Objek untuk membandingkan hash password
    private readonly encrypter: Encrypter, // Objek untuk mengenkripsi token akses
  ) {}

  async auth(
    authenticationParams: Authentication.Params,
  ): Promise<Authentication.Result | null> {
    // Mengambil akun dari repository berdasarkan email yang diberikan
    const account =
      await this.loadAccountByEmailRepository.getByEmail(authenticationParams);
    if (account) {
      // Membandingkan hash password yang diberikan dengan hash password dalam database
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        account.password,
      );
      if (isValid) {
        // Mengenkripsi ID akun menjadi token akses
        const accessToken = await this.encrypter.encrypt(account.id);
        // Mengembalikan hasil autentikasi yang berhasil
        return {
          accessToken,
          name: account.name,
        };
      }
    }
    // Mengembalikan null jika autentikasi gagal
    return null;
  }
}
