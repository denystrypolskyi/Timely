import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../../types/auth.types";
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login, isLoggingIn } = useMe();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      setErrorMessage(message);
    }
  };

  return (
    <div className="container">
      {isLoggingIn ? (
        <ClipLoader size={20} color="#fff" />
      ) : (
        <div className="formWrapper">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                placeholder="Username"
                id="username"
                type="text"
                className="input"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div className="form-group">
              <input
                placeholder="Password"
                id="password"
                type="password"
                className="input"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div style={{display: "flex",justifyContent: "space-between", alignItems: "center"}}>
              <button className="button" type="submit">
                Login
              </button>
              <a onClick={() => navigate("/register")}>
                Don't have an account?
              </a>
            </div>
          </form>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
