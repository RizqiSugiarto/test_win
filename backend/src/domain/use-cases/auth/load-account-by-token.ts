export interface LoadAccountByToken {
  load: (accessToken: string) => Promise<LoadAccountByToken.Result | null>;
}

export namespace LoadAccountByToken {
  export type Result = {
    id: string;
  };
}
