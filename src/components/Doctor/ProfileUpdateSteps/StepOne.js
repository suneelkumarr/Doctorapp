import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "../../../utils/apiURL";
import { Images } from "../../../utils/Images";

const StepOne = ({ responsestep, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Image onChange
  const imageChangeHandeller = (event) => {
    let file = event.target.files[0];
    if (file) {
      setPreviewURL(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      return setFileError(true);
    }

    try {
      setLoading(true);
      const token = `token ${localStorage.getItem('token')}`
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", selectedFile);

      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/update`,
        formData, {
          headers: {authorization: token}
        }
      );
      if (response.status === 200) {
        setLoading(false);
        responsestep(2);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };

  return (
    <div className="step">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Container */}
        <div className="img-container text-center">
          <div
            className={
              fileError
                ? "image rounded-circle danger-border"
                : "image rounded-circle border"
            }
          >
            {previewURL ? (
              <img src={previewURL} className="img-fluid" alt="..." />
            ) : (
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            )}
            <div className="overlay">
              <input
                type="file"
                className="upload"
                onChange={imageChangeHandeller}
              />
              <p className="mb-0">Choose Image</p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="form-group mt-2 mb-3">
          {errors.name && errors.name.message ? (
            <p className="text-danger">{errors.name && errors.name.message}</p>
          ) : (
            <p>Name</p>
          )}

          <input
            type="text"
            name="name"
            {...register("name", { required: "Name is required" })}
            className="form-control shadow-none"
            placeholder="Enter name"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="btn shadow-none"
            disabled={isLoading}
          >
            {isLoading ? <span>Please Wait...</span> : <span>Next</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;
