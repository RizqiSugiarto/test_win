export interface GetAccountById {
  perform: (
    params: GetAccountById.Params,
  ) => Promise<GetAccountById.Result | null>;
}

export namespace GetAccountById {
  export type Params = { id: string };
  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    photoProfile: string;
    created_at: Date;
    updated_at: Date | null;
  };
}
