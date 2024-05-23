import { LoadAccountByToken } from "../../../domain/use-cases/auth/load-account-by-token";
import { Decrypter } from "../../protocols";

export class LoadAccountByTokens implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter, // Objek untuk mendekripsi token akses
  ) {}

  async load(accessToken: string): Promise<LoadAccountByToken.Result | null> {
    // Mendekripsi token akses menjadi ID akun
    const token = await this.decrypter.decrypt(accessToken);
    // Jika token berhasil didekripsi, kembalikan objek yang berisi ID akun
    if (token)
      return {
        id: token,
      };
    // Jika token tidak dapat didekripsi, kembalikan null
    return null;
  }
}
