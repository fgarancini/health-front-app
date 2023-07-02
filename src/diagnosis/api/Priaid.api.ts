import { AuthApi } from "../../auth/api/auth.api";
import { DiagnosisResponse } from "../interfaces/interfaces";

export class PriaidApi {
  async getSymptoms(): Promise<{ ID: number; Name: string }[]> {
    const accessToken = localStorage.getItem("token") as string;
    const response = await AuthApi.getInstance()
      .apiInstance(accessToken)
      .get("/app/symptoms");
    // control de errores
    return response.data;
  }

  async getDiagnosis(symptoms: number[]): Promise<DiagnosisResponse[]> {
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

  async saveDiagnosis(diagnosis: {
    ID: number;
    Name: string;
    Accuracy: string;
  }) {
    const accessToken = localStorage.getItem("token") as string;
    const user = JSON.parse(localStorage.getItem("user") as string);
    const response = await AuthApi.getInstance()
      .apiInstance(accessToken)
      .post("/app/history", {
        user_id: user?.id,
        issue_id: diagnosis.ID,
        name: diagnosis.Name,
        accuracy: diagnosis.Accuracy,
      });
      // if (response.status === 200) {
        
      // }
  }

  async getHistory() {
    const accessToken = localStorage.getItem("token") as string;
    const user = JSON.parse(localStorage.getItem("user") as string);
    const response = await AuthApi.getInstance()
      .apiInstance(accessToken)
      .get(`/app/history/${user?.id}`);
    return response;
  }
}
