import React, { useState } from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import Toast from "../../../Toast-Notification/index";
import Icon from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md";

const ProfileUpdate = ({ editdialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    setSuccess(true);
  };

  return (
    <div className="profile-update-modal">
      <div className="backdrop">
        <div className="custom-modal-dialog">
          <div className="card border-0 shadow">
            <div className="card-header bg-white border-bottom text-center p-4">
              <div className="d-flex">
                <div>
                  <h5 className="mb-0">Update Profile</h5>
                </div>
                <div className="ml-auto">
                  <button
                    type="button"
                    className="btn btn-light rounded-circle shadow-none p-1"
                    onClick={() => editdialog(false)}
                  >
                    <Icon icon={ic_clear} size={25} />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-3 p-lg-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <h6>Personal Information</h6>

                    {/* Name */}
                    <div className="form-group mb-3">
                      {errors.name && errors.name.message ? (
                        <small className="text-danger">
                          {errors.name && errors.name.message}
                        </small>
                      ) : (
                        <small>Name</small>
                      )}
                      <input
                        type="text"
                        name="name"
                        {...register("name", { required: "Name is required." })}
                        className="form-control shadow-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="form-group mb-3">
                      {errors.email && errors.email.message ? (
                        <small className="text-danger">
                          {errors.email && errors.email.message}
                        </small>
                      ) : (
                        <small>E-mail</small>
                      )}
                      <input
                        type="text"
                        name="email"
                        {...register("email", {
                          required: "E-mail is required.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address.",
                          },
                        })}
                        className="form-control shadow-none"
                      />
                    </div>

                    {/* Phone */}
                    <div className="form-group mb-3">
                      {errors.phone && errors.phone.message ? (
                        <small className="text-danger">
                          {errors.phone && errors.phone.message}
                        </small>
                      ) : (
                        <small>Phone number</small>
                      )}
                      <input
                        type="text"
                        name="phone"
                        {...register("phone", {
                          required: "Phone number is required.",
                        })}
                        className="form-control shadow-none"
                      />
                    </div>

                    {/* Address */}
                    <div className="form-group mb-3">
                      {errors.address && errors.address.message ? (
                        <small className="text-danger">
                          {errors.address && errors.address.message}
                        </small>
                      ) : (
                        <small>Address</small>
                      )}
                      <input
                        type="text"
                        name="address"
                        {...register("address", {
                          required: "Address is required.",
                        })}
                        className="form-control shadow-none"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                    <h6>Educational Information</h6>

                    {/* Degree */}
                    <div className="form-group mb-3">
                      {errors.degree && errors.degree.message ? (
                        <small className="text-danger">
                          {errors.degree && errors.degree.message}
                        </small>
                      ) : (
                        <small>Degree</small>
                      )}
                      <input
                        type="text"
                        name="degree"
                        {...register("degree", {
                          required: "degree is required.",
                        })}
                        className="form-control shadow-none"
                      />
                    </div>

                    {/* College */}
                    <div className="form-group mb-3">
                      {errors.college && errors.college.message ? (
                        <small className="text-danger">
                          {errors.college && errors.college.message}
                        </small>
                      ) : (
                        <small>College</small>
                      )}
                      <input
                        type="text"
                        name="college"
                        {...register("college", {
                          required: "College is required.",
                        })}
                        className="form-control shadow-none"
                      />
                    </div>

                    {/* Passing year */}
                    <div className="form-group mb-3">
                      {errors.passing_year && errors.passing_year.message ? (
                        <small className="text-danger">
                          {errors.passing_year && errors.passing_year.message}
                        </small>
                      ) : (
                        <small>Passing year</small>
                      )}
                      <input
                        type="text"
                        name="passing_year"
                        {...register("passing_year", {
                          required: "Passing year is required.",
                        })}
                        className="form-control shadow-none"
                      />
                    </div>

                    {/* Works hospital */}
                    <div className="form-group mb-3">
                      {errors.works_hospital &&
                      errors.works_hospital.message ? (
                        <small className="text-danger">
                          {errors.works_hospital &&
                            errors.works_hospital.message}
                        </small>
                      ) : (
                        <small>Works hospital</small>
                      )}
                      <input
                        type="text"
                        name="works_hospital"
                        {...register("works_hospital", {
                          required: "Works hospital is required.",
                        })}
                        className="form-control shadow-none"
                      />
                    </div>
                  </div>

                  <div className="col-12 my-3 text-center">
                    <input type="file" />
                    <br />
                    <button
                      type="submit"
                      className="btn btn-primary shadow-none text-white"
                    >
                      {isLoading ? (
                        <span>Updating...</span>
                      ) : (
                        <span>Update</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {isSuccess ? (
                <Toast
                  toast="success"
                  position="top-right"
                  title="Successfully"
                  message="Profile updated."
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
