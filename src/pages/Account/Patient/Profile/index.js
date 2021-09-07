import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Images } from "../../../../utils/Images";

import { apiURL } from "../../../../utils/apiURL";
import { checkIfError } from "../../../../utils/Error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({ autoClose: 2000 });
const Index = ({ user }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isUpload, setUpload] = useState(false);
  const id = localStorage.getItem("id");
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  // Image onChange
  const imageChangeHandeller = async (event) => {
    const file = event.target.files[0];

    try {
      if (file) {
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
        let formData = new FormData();
        formData.append("image", file);

        setUpload(true);
        const response = await axios.post(
          `${apiURL}/patient/profile/${id}/update/photo`,
          formData,
          header
        );
        if (response.status === 201) {
          setUpload(false);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      if (error) {
        setUpload(false);
        checkIfError(error);
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiURL}/patient/profile/${id}/update/bio`,
        data,
        header
      );
      if (response.status === 201) {
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error) checkIfError(error);
    }
  };

  return (
    <div className="patient-profile">
      <div className="container-fluid py-3 py-lg-0">
        <div className="row">
          <div className="col-12 pl-lg-0">
            <div className="card border-0 shadow">
              <div className="card-body px-md-4">
                {/* Image Container */}
                <div className="img-container text-center">
                  <div className="image rounded-circle border">
                    {user && user.image ? (
                      <img src={user.image} className="img-fluid" alt="..." />
                    ) : previewURL ? (
                      <img src={previewURL} className="img-fluid" alt="..." />
                    ) : (
                      <img
                        src={Images.FakeUser}
                        className="img-fluid"
                        alt="..."
                      />
                    )}
                    <div className="overlay">
                      <div className="flex-center flex-column">
                        {isUpload ? null : (
                          <input
                            type="file"
                            className="upload"
                            onChange={imageChangeHandeller}
                          />
                        )}
                        {isUpload ? (
                          <p className="mb-0">Uploading...</p>
                        ) : (
                          <p className="mb-0">Change</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-12 col-md-6 pr-md-2">
                      <div className="form-group mb-3">
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
                          defaultValue={user ? user.name : null}
                          {...register("name", { required: "Name is required" })}
                          className="form-control shadow-none"
                          placeholder="Name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6 pl-md-2">
                      <div className="form-group mb-3">
                        <p>Email</p>
                        <input
                          type="text"
                          name="email"
                          defaultValue={user ? user.email : null}
                          className="form-control shadow-none"
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Age */}
                    <div className="col-12 col-md-6 pr-md-2">
                      <div className="form-group mb-3">
                        {errors.age && errors.age.message ? (
                          <p className="text-danger">
                            {errors.age && errors.age.message}
                          </p>
                        ) : (
                          <p>Age</p>
                        )}

                        <input
                          type="number"
                          name="age"
                          defaultValue={user ? user.age : null}
                          {...register("age", { required: "Age is required" })}
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>

                    {/* Height */}
                    <div className="col-12 col-md-6 pl-md-2">
                      <div className="form-group mb-3">
                        {errors.height && errors.height.message ? (
                          <p className="text-danger">
                            {errors.height && errors.height.message}
                          </p>
                        ) : (
                          <p>Height</p>
                        )}

                        <input
                          type="text"
                          name="height"
                          defaultValue={user ? user.height : null}
                          {...register("height", { required: "Height is required" })}
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>

                    {/* Weight */}
                    <div className="col-12 col-md-6 pr-md-2">
                      <div className="form-group mb-3">
                        {errors.weight && errors.weight.message ? (
                          <p className="text-danger">
                            {errors.weight && errors.weight.message}
                          </p>
                        ) : (
                          <p>Weight</p>
                        )}

                        <input
                          type="number"
                          name="weight"
                          defaultValue={user ? user.weight : null}
                          {...register("weight", { required: "Weight is required" })}
                          className="form-control shadow-none"
                          placeholder="Weight (Kg)"
                        />
                      </div>
                    </div>

                    {/* Blood pressure */}
                    <div className="col-12 col-md-6 pl-md-2">
                      <div className="form-group mb-3">
                        {errors.bloodPressure &&
                        errors.bloodPressure.message ? (
                          <p className="text-danger">
                            {errors.bloodPressure &&
                              errors.bloodPressure.message}
                          </p>
                        ) : (
                          <p>Blood pressure</p>
                        )}

                        <input
                          type="text"
                          name="bloodPressure"
                          defaultValue={user ? user.bloodPressure : null}
                          {...register("bloodPressure", { required: "Blood pressure is required" })}
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>

                    <div className="col-12 text-right">
                      <button
                        type="submit"
                        className="btn shadow-none"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>Updating ...</span>
                        ) : (
                          <span>Update</span>
                        )}
                      </button>
                    </div>
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

export default Index;
