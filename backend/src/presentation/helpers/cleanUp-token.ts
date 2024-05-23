export class CleanJwtToken {
  static cleanToken = (token: string): string => {
    const prefix = "Bearer ";

    if (token.startsWith(prefix)) {
      return token.slice(prefix.length).trim();
    }
    return token.trim();
  };
}
