import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";

import DoctorList from "../../../../components/Admin/DoctorList/index";
import PreLoader from "../../../../components/Admin/Loader/index";

const Index = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch doctors
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/doctor`);
        if (response.status === 200) {
          setDoctors(response.data.doctors);
          setLoading(false);
        }
      } catch (error) {
        if (error) console.log(error.response);
      }
    };

    fetchDoctor();
  }, []);

  // Preloader
  if (isLoading) return <PreLoader />;

  return (
    <div className="dashboard-doctor-index">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-padding">
            <div className="card border-0 shadow-sm">
              <DoctorList doctors={doctors} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
