import { useMoveBack } from "../../hooks/useMoveBack.js";
const ButtonMoveBack = () => {
  const moveBack = useMoveBack();
  return (
    <button
      onClick={moveBack}
      className="w-[150px]  rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Go back
    </button>
  );
};

export default ButtonMoveBack;