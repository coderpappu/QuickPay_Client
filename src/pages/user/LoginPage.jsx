import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import DashImg from "../../assets/dashboard-demo.png";
import XceedLogo from "../../assets/xceed-bangladesh-logo.png";
import LoginForm from "../../components/LoginForm";
import { useLoginUserMutation } from "../../features/api";

const LoginPage = () => {

  const navigate = useNavigate();
  
  const [login, { error, isLoading }] = useLoginUserMutation();

  const handleLogin = async (email, password) => {
    try {
      let { data } = await login({ email, password }).unwrap();

      localStorage.setItem("token", data?.accessToken);
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto mt-24 h-auto rounded-md bg-white shadow-md xl:w-[1000px]">
        <div className="flex w-full flex-wrap justify-around">
          {/* image side  */}
          <div className="w-[80%] sm:w-[50%] md:w-[50%]">
            <img
              src={XceedLogo}
              alt="xceed bd"
              className="ml-2 mt-3 w-[120px]"
            />
            <LoginForm handleLogin={handleLogin} />
          </div>
          {/* Login Form  */}
          <div className="my-3 h-[600px] w-[47%] rounded-md bg-[#4153EF] p-14">
            <div>
              <h2 className="text-xl leading-7 text-white">
                The simplest way to manage <br /> your office
              </h2>
              <p className="my-4 text-slate-200">
                Enter your credential to access your account.
              </p>
            </div>
            <img
              src={DashImg}
              alt="login_image"
              className="mx-auto mt-14 h-auto w-full rounded-md xl:w-[300px]"
            />
            <div className="mt-16 flex flex-wrap justify-center gap-2">
              <Link
                to="/employee/login"
                className="rounded-sm bg-white px-2 py-2 text-sm text-[#4153EF]"
              >
                Employee Login
              </Link>
              <Link
                to="/registration"
                className="rounded-sm bg-white px-2 py-2 text-sm text-[#4153EF]"
              >
                SIGN UP
              </Link>
            </div>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
