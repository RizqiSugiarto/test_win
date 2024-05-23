export interface IUser {
    id: string
    name: string
    email: string
    password: string
    gender: string;
    photoProfile: string
    created_at: Date
    updated_at: Date
}

export interface NewUSer {
    name: string;
    email: string;
    password: string;
    photo_profile: string;
    gender: string;
}
