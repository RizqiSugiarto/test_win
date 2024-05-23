export interface IAuth {
    email: string
    password: string
}

export interface TokenStructure {
    iat: number
    id: string
}
