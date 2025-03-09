import { FormikInputBox } from "@/components/form-components/FormikInputBox";
import { FormikSubmit } from "@/components/form-components/FormikSubmit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "../hooks/useLogin";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("password field is required"),
  username: Yup.string().required("username is required"),
});
// initailValues must be Empty before Production
const initialValues = {
  username: "ADMIN00000",
  password: "password",
};

const FormikForm = ({ formik, mutation }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-10">
        <div className="mb-6">
          <FormikInputBox
            formik={formik}
            semi
            type={"text"}
            extClass={"align-self-right"}
            name="username"
            label="User Id"
          />
        </div>

        <div className="mb-6">
          <FormikInputBox
            formik={formik}
            semi
            type={"password"}
            extClass={"align-self-right"}
            name="password"
            label="Password"
          />
        </div>
        <div className="flex items-center justify-center">
          <FormikSubmit
            formik={formik}
            btnColor=""
            label="Login"
            disabled={mutation.isPending}
            className="self-center w-full py-3 font-bold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:ring-4 active:ring-blue-300/20 focus:bg-blue-600 active:text-white "
          />
        </div>
      </div>
    </form>
  );
};
const Login = () => {
  const loginMutation = useLogin();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await loginMutation.mutate(values);
      console.log("Submitting login");
    },
  });
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-10"
        style={{ backgroundImage: "url(/images/launch.jpg)" }}
      ></div>

      <div
        className="relative motion-preset-slide-right  bg-slate-500 bg-opacity-30 backdrop-filter
       backdrop-blur-md border border-white border-opacity-30 pt-6 pb-10 rounded-2xl shadow-xl w-[400px]
        sm:w-[460px] transform transition-all hover:shadow-2xl"
      >
        <h2 className="pb-4 mb-2 text-3xl font-bold text-center text-gray-100 border-b-[10px] rounded-lg shadow-lg
         border-slate-200/50 sm:text-4xl">
          {import.meta.env.VITE_APP_NAME}
        </h2>
        <p className="mb-6 text-center text-gray-300">
          Please login to your account
        </p>
        <FormikForm formik={formik} mutation={loginMutation} />

        <div className="hidden mt-4 text-center">
          <a
            href="#"
            className="font-semibold transition-colors duration-200 ease-in-out text-slate-100 hover:text-blue-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
export const PostMutation = async (values) => {
  //const navigate = useNavigate()
  console.log("cal00l");
  const loginMutation = useLogin();
  loginMutation.mutate(values, {
    onSuccess: (data) => {
      console.log("login success within component", data);
      // navigate('/dashboard'); // Make sure this doesn't trigger a re-render and cause the mutation to be triggered again.
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // toast.error(error.response.data.message)
    },
  });
};
