export interface DeleteAccount {
  perform: (params: DeleteAccount.Params) => Promise<DeleteAccount.Result>;
}

export namespace DeleteAccount {
  export type Params = { id: string };
  export type Result = { id: string };
}
