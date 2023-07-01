import { useState } from "react";
import CustomSelect from "../../auth/components/CustomSelect";
import styles from "../styles/diagnosis.module.css";
import { SymptomSelect } from "../interfaces/interfaces";

const DiagnosisPage = () => {
  const [sypmtoms, setSypmtoms] = useState<SymptomSelect[]>([]);

  return (
    <div className={`${styles.diagnosis_box} m-3 shadow-lg shadow-cyan-200/70`}>
      <CustomSelect
        label="Symptoms"
        isMulti={true}
        options={[
          {
            value: 0,
            label: "Anxiety",
          },
          {
            value: 238,
            label: "Anxiety",
          },
          {
            value: 104,
            label: "Back pain",
          },
          {
            value: 75,
            label: "Burning eyes",
          },
          {
            value: 46,
            label: "Burning in the throat",
          },
          {
            value: 170,
            label: "Cheek swelling",
          },
          {
            value: 17,
            label: "Chest pain",
          },
          {
            value: 31,
            label: "Chest tightness",
          },
        ]}
        name="symptoms"
        onChange={(selectedOption) => {
          setSypmtoms(() => [...(selectedOption as SymptomSelect[])]);
        }}
        values={sypmtoms}
      />
    </div>
  );
};

export default DiagnosisPage;
