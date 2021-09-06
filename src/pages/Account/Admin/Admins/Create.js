import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { apiURL } from "../../../../utils/apiURL";

const Create = () => {
  const { register, handleSubmit,formState: { errors }} = useForm();
  const [isLoading, setLoading] = useState(false);

  // Submit Form
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${apiURL}/admin/auth/store`, data);
      if (response.status === 201) {
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        toast.warn(error.response.data.message);
      }
    }
  };

  return (
    <div className="dashboard-admin-create py-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 m-auto">
            <div className="card shadow border-0">
              <div className="card-header p-4 bg-white">
                <h5 className="mb-0">Create Admin</h5>
              </div>
              <div className="card-body p-4 p-lg-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
                  <div className="form-group mb-4">
                    {errors.name && errors.name.message ? (
                      <p className="text-danger">
                        {errors.name && errors.name.message}
                      </p>
                    ) : (
                      <p>Name</p>
                    )}

                    <input
                      type="text"
                      name="name"
                      {...register("name", {required: "Name is required" })}
                      className="form-control shadow-none"
                      placeholder="Enter name"
                    />
                  </div>

                  {/* E-mail */}
                  <div className="form-group mb-4">
                    {errors.email && errors.email.message ? (
                      <p className="text-danger">
                        {errors.email && errors.email.message}
                      </p>
                    ) : (
                      <p>E-mail</p>
                    )}

                    <input
                      type="text"
                      name="email"
                      {...register("email", { required: true })}
                      className="form-control shadow-none"
                      placeholder="Enter e-mail"
                    />
                  </div>

                  {/* Role */}
                  <div className="form-group mb-4">
                    {errors.role && errors.role.message ? (
                      <p className="text-danger">
                        {errors.role && errors.role.message}
                      </p>
                    ) : (
                      <p>Role</p>
                    )}

                    <select
                      name="role"
                      {...register("role", { required: "Role is required"})}
                      className="form-control shadow-none"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="form-group mb-4">
                    {errors.password && errors.password.message ? (
                      <p className="text-danger">
                        {errors.password && errors.password.message}
                      </p>
                    ) : (
                      <p>Password</p>
                    )}

                    <input
                      type="password"
                      name="password"
                      {...register("password", { required: "Please enter password",
                      minLength: {
                        value: 8,
                        message: "minimum length 8 character",
                      },})}
                      className="form-control shadow-none"
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn shadow-none"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
