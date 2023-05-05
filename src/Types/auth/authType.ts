export interface AuthType{
    username: string,
    password: string,
    db_code: number
}

export default interface AuthWithBranch{
    branch_code:string,
    branch_name: string,
    is_auth: boolean
}