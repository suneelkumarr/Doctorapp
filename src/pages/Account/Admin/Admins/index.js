import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import Icon from "react-icons-kit";
import { Link } from "react-router-dom";
import { ic_add } from "react-icons-kit/md";
import { apiURL } from "../../../../utils/apiURL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminList from "../../../../components/Admin/AdminList/index";
import PreLoader from "../../../../components/Admin/Loader/index";
const Index = () => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setLoading] = useState(true);

 const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/auth/index`);
        if (response.status === 200) {
          setAdmins(response.data.admins);
          setLoading(false);
        }
      } catch (error) {
        if (error) {
          setLoading(false);
          toast.warn(error.response.data.message);
        }
      }
    };
  useEffect(() => {
    // Fetch admin
    fetchAdmin();
  }, []);

  // Preloader
  if (isLoading) return <PreLoader />;

  return (
    <div className="dashboard-admin-index">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-padding">
            <div className="card border-0 shadow-sm">
              <AdminList admins={admins} />
            </div>
          </div>
        </div>
      </div>

      {/* Float button */}
      <Link
        to="/admin/create-admin"
        type="button"
        className="btn shadow-none rounded-circle float-btn"
      >
        <Icon icon={ic_add} size={22} />
      </Link>
    </div>
  );
};

export default Index;
