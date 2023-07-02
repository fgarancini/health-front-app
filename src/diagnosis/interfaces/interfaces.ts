export interface SymptomSelect {
  value: number;
  label: string;
}
export interface Issue {
  Accuracy: number;
  ID: number;
  Icd: string;
  IcdName: string;
  Name: string;
  ProfName: string;
  Ranking: number;
}

export interface Specialisation {
  ID: number;
  Name: string;
  SpecialistID: number;
}

export interface DiagnosisResponse {
  Issue: Issue;
  Specialisation: Specialisation;
}

export interface IssueHistory {
  issue_id: number;
  name: string;
  accuracy: number;
  created_at: Date;
}
