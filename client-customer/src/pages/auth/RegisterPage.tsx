import FormValidation from "../../components/ui/FormValidation";
import Logo from "../../components/ui/Logo";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ButtonMoveBack from "../../components/ui/ButtonMoveBack";

const CustomerRegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const { register } = useAuth();

  useEffect(() => {
    setIsSubmited(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmited(true);

    if (email && password && checked) {
      register(email, password);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-white px-6 py-12 dark:bg-dark-100 lg:px-8">
      <ButtonMoveBack />
      <div className="flex flex-col items-center justify-center gap-7 sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          BECOME A NIKE MEMBER
        </h2>
        <p className="text-center text-slate-500 dark:text-white">
          Create your Nike Member profile and get first access to the very best
          of Nike products, inspiration and community.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <FormValidation
            inputName="Email address"
            type="email"
            value={email}
            setValue={setEmail}
            isSubmited={isSubmited}
          >
            {null}
          </FormValidation>
          <FormValidation
            inputName="Password"
            type={show ? "text" : "password"}
            value={password}
            setValue={setPassword}
            isSubmited={isSubmited}
          >
            <div
              className="absolute right-3 top-3"
              onClick={() => setShow((show) => !show)}
            >
              {show ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </FormValidation>

          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              id="confirm-login"
              name="confirm-login"
              value={`${checked}`}
              onChange={() => setChecked((checked) => !checked)}
              required
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="confirm-login"
              className=" text-sm  text-slate-500 dark:text-slate-50"
            >
              By creating an account, you agree to Nike's Privacy Policy and
              Terms of Use.
            </label>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Join Us
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegisterPage;
