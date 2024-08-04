import LoginForm from "../../components/LoginForm";
import LoginImg from "../../assets/login.jpg";
import Logo from "../../components/Logo";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLoginUserMutation } from "../../features/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { error, isLoading }] = useLoginUserMutation();

  const handleLogin = async (email, password) => {
    try {
      let { data } = await login({ email, password });
      localStorage.setItem("token", data?.message?.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("Email or password is incorrect!");
    }
  };
  return (
    <div className="w-full h-screen bg-[#FCFCFC]">
      <div className="xl:wrapper-container">
        {/* company logo */}
        <Logo />
        <div className="w-full flex flex-wrap justify-around">
          {/* image side  */}
          <div className="w-[80%] sm:w-[50%] md:w-[50%]  h-screen">
            <img
              src={LoginImg}
              alt="login_image"
              className="w-full h-auto xl:w-[600px]"
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

export default LoginPage;
