import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios.jsx";
import { createUserSchema } from "../schema";

const initialValues = {
  full_name: "",
  email: "",
  phone_number: "",
  password: "",
};

const CreateUserField = () => {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    try {
      console.log(values);
      const response = await axios.post("/create-user", {
        client_name: values.full_name,
        client_email: values.email.toLowerCase(),
        client_phone_number: values.phone_number,
        password: values.password,
      });
      console.log(response.data);
      actions.resetForm();
      toast.success("User created");
      navigate("/createProject", {
        state: { user: response.data.user.client_email },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: createUserSchema,
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="bg-blue1/80 p-8 rounded-lg">
        <div className="flex items-center p-1.5">
          <p className="w-72 font-medium text-white2 tracking-wide">
            Full name
          </p>
          <input
            type="text"
            name="full_name"
            value={values.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.full_name && touched.full_name ? "border-red-500" : ""
            }`}
          />
          {errors.full_name && touched.full_name && (
            <p className="error ml-4">{errors.full_name}</p>
          )}
        </div>

        <hr className="my-1.5 border-gray-400" />

        <div className="flex items-center p-1.5">
          <p className="font-medium w-72 text-white2 tracking-wide">
            Email address
          </p>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none lowercase ${
              errors.email && touched.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && touched.email && (
            <p className="error ml-4">{errors.email}</p>
          )}
        </div>
        <hr className="my-1.5 border-gray-400" />

        <div className="flex items-center p-1.5">
          <p className="font-medium w-72 text-white2 tracking-wide">
            Phone number
          </p>
          <input
            type="text"
            name="phone_number"
            value={values.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.phone_number && touched.phone_number
                ? "border-red-500"
                : ""
            }`}
          />
          {errors.phone_number && touched.phone_number && (
            <p className="error ml-4">{errors.phone_number}</p>
          )}
        </div>
        <hr className="my-1.5 border-gray-400" />

        <div className="flex items-center p-1.5">
          <p className="w-72 font-medium text-white2 tracking-wide">
            Password (min 8 characters)
          </p>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.password && touched.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && touched.password && (
            <p className="error ml-4 tracking-wider">{errors.password}</p>
          )}
        </div>
        <hr className="my-1.5 border-gray-400" />

        <div className="pt-6">
          <div className="flex space-x-3 justify-end">
            <button
              type="button"
              className="text-white3 hover:bg-blue1/40 px-8 py-3 rounded-lg font-medium border-white3 border-[1.5px] tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue1/80 hover:bg-blue1 text-white2 px-8 py-3 rounded-lg font-medium tracking-wide"
              disabled={isSubmitting}
            >
              Create user
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateUserField;
