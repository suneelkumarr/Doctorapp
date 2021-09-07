import React from 'react'
import './style.scss'
// import { Link } from 'react-router-dom'

const Index = ({ admins }) => {
    return (
        <div className="admin-list">
            <table className="table table-responsive-lg table-borderless">
                <thead>
                    <tr className="border-bottom">
                        <td className="text-center">SL</td>
                        <td className="text-center">Image</td>
                        <td>Name</td>
                        <td>E-mail</td>
                        <td className="text-center">Role</td>
                        <td className="text-center">Status</td>
                        {/* <td className="text-center">Action</td> */}
                    </tr>
                </thead>
                <tbody>
                    {admins && admins.map((admin, i) =>
                        <tr className="border-bottom" key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td className="text-center">
                                <div className="img-container rounded-circle">
                                    {admin.image ?
                                        <img src={admin.image} className="img-fluid" alt="..." />
                                        : null}
                                </div>
                            </td>
                            <td>{admin.name}</td>
                            <td className="text-lowercase">{admin.email}</td>
                            <td className="text-center text-capitalize">{admin.role}</td>
                            <td className="text-center text-capitalize">{admin.status}</td>
                            {/* <td className="text-center">
                                <Link
                                    to={`/admin/doctor/${admin._id}/show`}
                                    type="button"
                                    className="btn btn-sm shadow-none"
                                >View</Link>
                            </td> */}
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Index;