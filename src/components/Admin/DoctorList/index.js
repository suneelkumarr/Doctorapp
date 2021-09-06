import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Index = ({ doctors }) => {
  // const [totalPage] = useState([...Array(10).keys()])

  return (
    <div className="doctor-list">
      <table className="table table-responsive-lg table-borderless">
        <thead>
          <tr className="border-bottom">
            <td className="text-center">SL</td>
            <td className="text-center">Image</td>
            <td>Name</td>
            <td>Specialist</td>
            <td className="text-center">Status</td>
            <td className="text-center">Action</td>
          </tr>
        </thead>
        <tbody>
          {doctors &&
            doctors.map((doctor, i) => (
              <tr className="border-bottom" key={i}>
                <td className="text-center">{i + 1}</td>
                <td className="text-center">
                  <div className="img-container rounded-circle">
                    {doctor.image ? (
                      <img src={doctor.image} className="img-fluid" alt="..." />
                    ) : null}
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td className="text-capitalize">{doctor.specialist}</td>
                <td className="text-center text-capitalize">
                  {doctor.isApproved}
                </td>
                <td className="text-center">
                  <Link
                    to={`/admin/doctor/${doctor._id}/show`}
                    type="button"
                    className="btn btn-sm shadow-none"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pageination */}
      {/* <div className="pageination-items pl-2">
                <ul>
                    {totalPage.map((i) => {
                        return (<li key={i}><button type="button" className="btn shadow-none">{i + 1}</button></li>)
                    })}
                </ul>
            </div> */}
    </div>
  );
};

export default Index;
