import { environment } from "../../../environments/environment.development";

export const endpoints = {
    register: `${environment.apiUrl}/users/register`,
    login: `${environment.apiUrl}/users/login`,
    logout: `${environment.apiUrl}/users/logout`,
}