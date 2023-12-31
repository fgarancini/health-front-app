import CustomSelect from "../../auth/components/CustomSelect";
import Loader from "../../shared/components/Loader";
import AcurracyBar from "../components/AcurracyBar";
import useDiagnosis from "../hooks/useDiagnosis";
import { SymptomSelect } from '../interfaces/interfaces';
import styles from "../styles/diagnosis.module.css";
import { Navigate } from "react-router-dom";

const DiagnosisPage = () => {
  const isAuth = localStorage.getItem('token') !== null;
  
  const {
    diagnoses,
    setSelectedSymptoms,
    selectedSymptoms,
    loading,
    symptoms,
    handleSaveHistory
  } = useDiagnosis();

  if (!isAuth) {
    return (
      <Navigate to={'/'}/>
    )
  }

  return (
    <>
      <div
        className={`${styles.diagnosis_box} flex flex-col m-3 shadow-lg shadow-cyan-200/70`}
      >
        <CustomSelect
          label="Symptoms"
          isMulti={true}
          options={symptoms}
          name="symptoms"
          onChange={(selectedOption) => {
            setSelectedSymptoms(() => [...(selectedOption as SymptomSelect[])]);
          }}
          values={selectedSymptoms}
        />
        <div className="m-5 border-2 border-slate-200 rounded-md p-5 text-slate-600">
          {loading ? (
            <Loader />
          ) : (
            <>
              {diagnoses.length > 0
                ? diagnoses.map((diagnosis) => (
                    <AcurracyBar
                      key={diagnosis.Issue.ID}
                      label={diagnosis.Issue.Name}
                      accuracy={String(diagnosis.Issue.Accuracy.toFixed(2))}
                      handleSaveHistory={() => handleSaveHistory(diagnosis)}
                    />
                  ))
                : "No selected symptoms or diagnoses for your symptoms."}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DiagnosisPage;
