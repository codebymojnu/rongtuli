import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Field from "../common/Field";
export default function LoginForm() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        const { token: authToken, refreshToken } = token;

        setAuth({ user, authToken, refreshToken }); // স্টেটে সংরক্ষণ
        navigate("/");
      }
    } catch (error) {
      setError("root.random", { message: error.message });
    }
  };
  return (
    <form
      className="border-b border-[#3f3f3f] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          type="email"
          name="email"
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-500"
          }`}
          {...register("email", { required: "email id is required" })}
        />
      </Field>
      <Field label="Password" htmlFor="password" error={errors.password}>
        <input
          type="password"
          name="password"
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 charecter",
            },
          })}
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <button
        type="submit"
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}
