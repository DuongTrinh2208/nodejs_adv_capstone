export interface JwtPayload {
    user_id: number,
    name: string,
    email: string,
    date_of_birth: string,
    profile_image: string,
    iat: number,
    exp: number
}