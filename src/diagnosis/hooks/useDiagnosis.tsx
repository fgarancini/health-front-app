import { useEffect, useState } from "react";
import { DaignosisResponse, SymptomSelect } from "../interfaces/interfaces";
import { PriaidApi } from "../api/Priaid.api";

const useDiagnosis = () => {
  const [symptoms, setSymptoms] = useState<SymptomSelect[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomSelect[]>([]);
  const [diagnoses, setDiagnoses] = useState<DaignosisResponse[]>([]);
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


  return {
    symptoms,
    selectedSymptoms,
    diagnoses,
    setSelectedSymptoms,
    loading,
  };
};

export default useDiagnosis;
