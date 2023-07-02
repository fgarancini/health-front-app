import { useEffect, useState } from "react";
import { PriaidApi } from "../api/Priaid.api";
import Loader from "../../shared/components/Loader";
import AcurracyBar from "../components/AcurracyBar";
import { IssueHistory } from "../interfaces/interfaces";
import { Navigate } from "react-router-dom";

const UserHistory = () => {
  const isAuth = localStorage.getItem("token") !== null;

  const [userHistory, setUserHistory] = useState<IssueHistory[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getHistory() {
      setLoading(true);
      const priaidApi = new PriaidApi();
      const history = await priaidApi.getHistory();
      setUserHistory(history.data);
      setLoading(false);
    }
    getHistory();
  }, []);

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="m-5 border-2 border-slate-200 rounded-md p-5 text-slate-600">
      <p className="h6 mb-5 font-medium underline">User Diagnoses History</p>
      {loading ? (
        <Loader />
      ) : (
        <>
          {userHistory.length > 0
            ? userHistory.map((diagnosis) => (
                <AcurracyBar
                  key={diagnosis.issue_id}
                  label={diagnosis.name}
                  accuracy={String(diagnosis.accuracy)}
                  isHistory={true}
                  date={new Date(diagnosis.created_at).toLocaleDateString()}
                />
              ))
            : "No diagnoses for at the moment."}
        </>
      )}
    </div>
  );
};

export default UserHistory;
