import { AuthApi } from "../../auth/api/auth.api";
import { DaignosisResponse } from "../interfaces/interfaces";

export class PriaidApi {
  async getSymptoms(): Promise<{ ID: number; Name: string }[]> {
    const accessToken = localStorage.getItem("token");
    const response = await AuthApi.getInstance()
      .apiInstance(accessToken as string)
      .get("/app/symptoms");
    // control de errores
    return response.data;
  }

  async getDiagnosis(symptoms: number[]): Promise<DaignosisResponse[]> {
    const accessToken = localStorage.getItem("token") as string;
    const user = JSON.parse(localStorage.getItem("user") as string);
    const response = await AuthApi.getInstance()
      .apiInstance(accessToken)
      .post("/app/diagnosis", {
        userId: user?.id,
        symptoms: symptoms,
      });
    // control de errores

    return response.data;
  }

  // async saveDiagnosis({
  //   ID,
  //   Name,
  //   Accuracy,
  // }: {
  //   ID: string;
  //   Name: string;
  //   Accuracy: string;
  // }) {


  // }
}
