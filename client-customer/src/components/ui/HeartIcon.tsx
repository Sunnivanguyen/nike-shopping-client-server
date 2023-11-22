import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSounds from "../../hooks/useSounds";
import AlertToLoginModal from "./AlertToLoginModal";
import useAuth from "../../hooks/useAuth";

const HeartIcon = () => {
  const { playActive } = useSounds();
  const { user } = useAuth();
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    navigate("/login");
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleClick() {
    if (user) navigate("/favorites");
    else {
      openModal();
    }
  }

  return (
    <>
      {isOpen && (
        <AlertToLoginModal
          message={"add to favorites"}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
      <div
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-200 dark:opacity-90 dark:hover:bg-slate-500"
        onClick={playActive}
      >
        <button onClick={handleClick}>
          <FiHeart className="h-6 w-6 text-black dark:text-white" />
        </button>
      </div>
    </>
  );
};

export default HeartIcon;
