export interface UpdateAccount {
  perform: (params: UpdateAccount.Params) => Promise<UpdateAccount.Result>;
}

export namespace UpdateAccount {
  export type Params = {
    id: string;
    name: string;
    email: string;
    password: string;
    photoProfile: string;
  };
  export type Result = {
    id: string;
    name: string;
    email: string;
    photoProfile: string;
  };
}
