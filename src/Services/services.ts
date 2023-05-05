import http from "../Auth/http-common";
import authType from "../Types/auth/authType"

class AuthService {
  login(data: authType) {
    return http.post<authType>("/auth", data);
  }
}

export default new AuthService();