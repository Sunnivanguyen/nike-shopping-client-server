import { Link } from "react-router-dom";

const LoginButton: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <Link
        to="/login"
        className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
};

export default LoginButton;
