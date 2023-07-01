type Props = {
  label: string;
  accuracy: string;
  handleSaveHistory:() => void;
};

const AcurracyBar = ({ label, accuracy, handleSaveHistory }: Props) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-32 text-cyan-700">{label}</div>
      <div className="w-96 bg-gray-200 rounded-sm">
        <div
          className="h-6 bg-orange-300 rounded-sm"
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
      <div className="ml-2 text-cyan-700">{`${accuracy}%`}</div>
      <div className="ml-5">
        <button className=" bg-cyan-200 rounded-full hover:bg-cyan-100" onClick={handleSaveHistory}>
          <p className="w-fit m-2 text-sm font-weight: 600 font-bold py-1 px-2 rounded-full" >Save Diagnose</p>
        </button>
      </div>
    </div>
  );
};

export default AcurracyBar;
