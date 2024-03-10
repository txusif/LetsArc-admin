import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";

import axios from "../api/axios.jsx";
import { createProjectSchema } from "../schema";
import { StatusList } from "../constant";

const initialValues = {
  client_email: "",
  project_name: "",
  status: "",
  project_description: "",
};

const CreateProjectField = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (values, actions) => {
    try {
      console.log(values);
      const response = await axios.post("/create-video", {
        client_email: values.client_email.toLowerCase(),
        project_name: values.project_name,
        status: values.status,
        project_description: values.project_description || "",
      });
      console.log(response.data);
      actions.resetForm();
      toast.success("Project created");
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
    validationSchema: createProjectSchema,
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="bg-blue1/80 p-8 rounded-lg">
        <div className="flex items-center p-1.5">
          <p className="w-72 font-medium text-white2 tracking-wide">
            Client email
          </p>
          <input
            type="email"
            name="client_email"
            value={state?.user || values.client_email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.client_email && touched.client_email
                ? "border-red-500"
                : ""
            }`}
          />
          {errors.client_email && touched.client_email && (
            <p className="error ml-4">{errors.client_email}</p>
          )}
        </div>

        <hr className="my-1.5 border-gray-400" />

        <div className="flex items-center p-1.5">
          <p className="font-medium w-72 text-white2 tracking-wide">
            Project name
          </p>
          <input
            type="text"
            name="project_name"
            value={values.project_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.project_name && touched.project_name
                ? "border-red-500"
                : ""
            }`}
          />
          {errors.project_name && touched.project_name && (
            <p className="error ml-4">{errors.project_name}</p>
          )}
        </div>
        <hr className="my-1.5 border-gray-400" />

        <div className="flex items-center p-1.5">
          <p className="font-medium w-72 text-white2 tracking-wide">
            Project description (optional)
          </p>
          <input
            type="text"
            name="project_description"
            value={values.project_description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.project_description && touched.project_description
                ? "border-red-500"
                : ""
            }`}
          />
          {errors.project_description && touched.project_description && (
            <p className="error ml-4">{errors.project_description}</p>
          )}
        </div>
        <hr className="my-1.5 border-gray-400" />

        <div className="flex items-center p-1.5">
          <p className="w-72 font-medium text-white2 tracking-wide">
            Project status
          </p>
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`h-10 w-96 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
              errors.status && touched.status ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Status</option>
            {StatusList.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && touched.status && (
            <p className="error ml-4 tracking-wider">{errors.status}</p>
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
              Create project
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProjectField;
