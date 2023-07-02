import { useEffect, useState } from "react";
import { PriaidApi } from "../api/Priaid.api";
import { DiagnosisResponse, SymptomSelect } from "../interfaces/interfaces";

const useDiagnosis = () => {
  const [symptoms, setSymptoms] = useState<SymptomSelect[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomSelect[]>([]);
  const [diagnoses, setDiagnoses] = useState<DiagnosisResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSymptoms() {
      const priaidApi = new PriaidApi();
      const symptopms = await priaidApi.getSymptoms();
      const formattedSymptoms: SymptomSelect[] = symptopms.map((symptopm) => ({
        value: symptopm.ID,
        label: symptopm.Name,
      }));
      setSymptoms(formattedSymptoms);
    }
    getSymptoms();
  }, []);

  useEffect(() => {
    async function getDiagnosis() {
      setLoading(true);
      const priaidApi = new PriaidApi();
      const formattedSymptoms: number[] = selectedSymptoms.map(
        (symptopm) => symptopm.value
      );
      const diagnosesData = await priaidApi.getDiagnosis(formattedSymptoms);
      setDiagnoses(diagnosesData);
      setLoading(false);
    }
    if (selectedSymptoms.length >= 1) {
      getDiagnosis();
    } else {
      setDiagnoses([]);
    }
  }, [selectedSymptoms]);

  const handleSaveHistory = async (diagnosis: DiagnosisResponse) => {
    const { ID, Name, Accuracy } = diagnosis.Issue;

    const historyObject = {
      ID,
      Name,
      Accuracy: String(Accuracy.toFixed(2)),
    };

    const priaidApi = new PriaidApi();

    await priaidApi.saveDiagnosis(historyObject);
  };

  return {
    symptoms,
    selectedSymptoms,
    diagnoses,
    setSelectedSymptoms,
    handleSaveHistory,
    loading,
  };
};

export default useDiagnosis;
