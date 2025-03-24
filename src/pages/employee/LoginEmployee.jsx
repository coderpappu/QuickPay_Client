import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../assets/login.jpg";
import LoginForm from "../../components/LoginForm";
import Logo from "../../components/Logo";
import {
  useLoginEmployeeMutation,
  useSetCompanyIdMutation,
} from "../../features/api";

const LoginEmployee = () => {
  const navigate = useNavigate();

  const [login, { error, isLoading }] = useLoginEmployeeMutation();

  const [setCompanyId] = useSetCompanyIdMutation();

  const handleLogin = async (email, password) => {
    try {
      let { data } = await login({ email, password });

      if (!data) {
        toast.error("Email or password is incorrect!");
      }

      setCompanyId(data?.data?.user?.company_id);

      localStorage.setItem("token", data?.data?.accessToken);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="h-screen w-full bg-[#FCFCFC]">
      <div className="xl:wrapper-container">
        {/* company logo */}
        <Logo />
        <div className="flex w-full flex-wrap justify-around">
          {/* image side  */}
          <div className="h-screen w-[80%] sm:w-[50%] md:w-[50%]">
            <img
              src={LoginImg}
              alt="login_image"
              className="h-auto w-full xl:w-[600px]"
            />
          </div>
          {/* Login Form  */}
          <LoginForm handleLogin={handleLogin} />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default LoginEmployee;
