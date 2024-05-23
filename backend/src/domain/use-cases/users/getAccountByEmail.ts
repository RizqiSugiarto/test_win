
export interface GetAccountByEmail {
    perform: (params: GetAccountByEmail.Params) => Promise<GetAccountByEmail.Result | null>;
}

export namespace GetAccountByEmail {
    export type Params = {email: string};
    export type Result = {
        id: string,
        name: string,
        email: string,
        password: string,
        photoProfile: string
        created_at: Date,
        updated_at: Date | null,
    };
}