import { PiSneakerMoveBold } from "react-icons/pi";
import Menu from "./MenuComponent";
export default function SidebarComponent() {
  return (
    <div className="flex h-full w-[300px] flex-col border-r-2 border-slate-100 bg-dark-50">
      <div className="flex h-[250px] w-full flex-col items-center justify-center gap-4">
        <PiSneakerMoveBold className="mx-auto mt-[20px] h-[70px] w-[70px] text-white" />
        <h1 className=" font-sans text-3xl font-bold text-orange-50">
          NIKE STRIKE
        </h1>
      </div>
      <Menu />
    </div>
  );
}
