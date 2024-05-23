
export interface AddAccount{
    perform: (params: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
    export type Params = {
        name: string,
        email: string,
        password: string,
        gender: string,
        photo_profile: string
    };
    export type Result = {id: string};
}