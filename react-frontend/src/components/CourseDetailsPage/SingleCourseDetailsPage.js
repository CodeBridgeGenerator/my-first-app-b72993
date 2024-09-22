import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import StudentDetailsPage from "../StudentDetailsPage/StudentDetailsPage";

const SingleCourseDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [departmentID, setDepartmentID] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("courseDetails")
            .get(urlParams.singleCourseDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"departmentID"] }})
            .then((res) => {
                set_entity(res || {});
                const departmentID = Array.isArray(res.departmentID)
            ? res.departmentID.map((elem) => ({ _id: elem._id, departmentID: elem.departmentID }))
            : res.departmentID
                ? [{ _id: res.departmentID._id, departmentID: res.departmentID.departmentID }]
                : [];
        setDepartmentID(departmentID);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "CourseDetails", type: "error", message: error.message || "Failed get courseDetails" });
            });
    }, [props,urlParams.singleCourseDetailsId]);


    const goBack = () => {
        navigate("/courseDetails");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">CourseDetails</h3>
                </div>
                <p>courseDetails/{urlParams.singleCourseDetailsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">CourseID</label><p className="m-0 ml-3" >{_entity?.courseID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">CourseName</label><p className="m-0 ml-3" >{_entity?.courseName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Lecturer</label><p className="m-0 ml-3" >{_entity?.Lecturer}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">DepartmentID</label>
                    {departmentID.map((elem) => (
                        <Link key={elem._id} to={`/departmentDetails/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.departmentID}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <StudentDetailsPage/>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleCourseDetailsPage);
