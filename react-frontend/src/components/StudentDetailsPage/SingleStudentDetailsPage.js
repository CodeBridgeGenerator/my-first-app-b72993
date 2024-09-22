import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import { Calendar } from 'primereact/calendar';

const SingleStudentDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [courseID, setCourseID] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("studentDetails")
            .get(urlParams.singleStudentDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"courseID"] }})
            .then((res) => {
                set_entity(res || {});
                const courseID = Array.isArray(res.courseID)
            ? res.courseID.map((elem) => ({ _id: elem._id, courseID: elem.courseID }))
            : res.courseID
                ? [{ _id: res.courseID._id, courseID: res.courseID.courseID }]
                : [];
        setCourseID(courseID);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "StudentDetails", type: "error", message: error.message || "Failed get studentDetails" });
            });
    }, [props,urlParams.singleStudentDetailsId]);


    const goBack = () => {
        navigate("/studentDetails");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">StudentDetails</h3>
                </div>
                <p>studentDetails/{urlParams.singleStudentDetailsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">StuId</label><p className="m-0 ml-3" >{_entity?.stuId}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">StuName</label><p className="m-0 ml-3" >{_entity?.stuName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DOB</label><p id="DOB" className="m-0 ml-3" >{_entity?.DOB}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Address</label><p className="m-0 ml-3" >{_entity?.address}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">CourseID</label>
                    {courseID.map((elem) => (
                        <Link key={elem._id} to={`/courseDetails/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.courseID}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
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

export default connect(mapState, mapDispatch)(SingleStudentDetailsPage);
