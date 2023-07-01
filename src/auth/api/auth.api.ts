import axios from "axios";
import { config } from "../config/config";
import AsyncStorage from "react";
export class AuthApi {
  private static myInstance: AuthApi | null;
  private uri = config.apiUrl;
  static getInstance() {
    if (this.myInstance == null) {
      this.myInstance = new AuthApi();
    }
    return this.myInstance;
  }

  /**
   * Both login and register functions should be in a different api
   * refactor needed
   */

  async login(email: string, password: string) {
    const response = await axios.post(
      this.uri + "/app/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );


    if (response.status === 200) {
      localStorage.setItem("token", response.data?.token);
    }

    return response;
  }

  async register(
    first_name: string,
    last_name: string,
    gender: string | undefined,
    birthdate: Date,
    email: string,
    password: string
  ) {
    const response = await axios.post(
      this.uri + "/app/register",
      {
        first_name,
        last_name,
        gender,
        birthdate,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response;
  }
}
