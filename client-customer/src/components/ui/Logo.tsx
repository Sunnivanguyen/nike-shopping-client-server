import { SiNike } from "react-icons/si";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <SiNike className="h-12 w-auto text-black dark:text-white" />
    </Link>
  );
};

export default Logo;
