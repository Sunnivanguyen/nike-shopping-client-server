import { createContext, ReactNode } from "react";

import useSound from "use-sound";

type SoundContextType = {
  playActive: () => void;
};

const SoundsContext = createContext<SoundContextType | null>(null);

type IProps = {
  children: ReactNode;
};

const SoundsProvider: React.FC<IProps> = ({ children }) => {
  const [playActive] = useSound("/sounds/pop-down.wav", {
    volume: 0.25,
  });

  return (
    <SoundsContext.Provider value={{ playActive }}>
      {children}
    </SoundsContext.Provider>
  );
};

export { SoundsProvider, SoundsContext };
