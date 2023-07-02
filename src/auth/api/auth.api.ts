import axios, { RawAxiosRequestHeaders } from "axios";
import { config } from "../config/config";
import { ErrorValidationResponse } from "../interfaces/interfaces";
import { AxiosError } from "axios";
export class AuthApi {
  private static myInstance: AuthApi | null;
  static getInstance() {
    if (this.myInstance == null) {
      this.myInstance = new AuthApi();
    }
    return this.myInstance;
  }

  apiInstance = (accessToken?: string) => {
    const headers: RawAxiosRequestHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (accessToken && accessToken != "") {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return axios.create({
      baseURL: `${config.apiUrl}`,
      headers,
    });
  };

  /**
   * Both login and register functions should be in a different api
   * refactor needed
   */

  async login(email: string, password: string) {
    try {
      const response = await this.apiInstance().post("/app/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data?.token);
        localStorage.setItem("user", JSON.stringify(response.data?.user));
      }

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<ErrorValidationResponse> = error;
        if (axiosError.response) {
          const errorResponse: ErrorValidationResponse =
            axiosError.response.data;
          return errorResponse;
        }
      }
    }
  }

  async register(
    first_name: string,
    last_name: string,
    gender: string | undefined,
    birthdate: Date,
    email: string,
    password: string
  ) {
    try {
      const response = await this.apiInstance().post("/app/register", {
        first_name,
        last_name,
        gender,
        birthdate,
        email,
        password,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<ErrorValidationResponse> = error;
        if (axiosError.response) {
          const errorResponse: ErrorValidationResponse =
            axiosError.response.data;
          return errorResponse;
        }
      }
    }
  }

  async logout() {
    try {
      const accesToken = localStorage.getItem("token") as string;
      const user = JSON.parse(localStorage.getItem("user") as string);

      if (!accesToken || !user) {
        return false;
      }
      const response = await this.apiInstance(accesToken).post("/app/logout", {
        userId: user?.id,
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<ErrorValidationResponse> = error;
        if (axiosError.response) {
          const errorResponse: ErrorValidationResponse =
            axiosError.response.data;
          return errorResponse;
        }
      }
    }
  }
}
