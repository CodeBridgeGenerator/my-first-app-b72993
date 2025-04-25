import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import StudentDetailsPage from "../StudentDetailsPage/StudentDetailsPage";

const SingleCourseDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

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

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">CourseDetails</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>courseDetails/{urlParams.singleCourseDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">CourseID</label><p className="m-0 ml-3" >{_entity?.courseID}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">CourseName</label><p className="m-0 ml-3" >{_entity?.courseName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Lecturer</label><p className="m-0 ml-3" >{_entity?.Lecturer}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">DepartmentID</label>
                    {departmentID.map((elem) => (
                        <Link key={elem._id} to={`/departmentDetails/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.departmentID}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
                    <TabPanel header="studentDetails" leftIcon="pi pi-building-columns mr-2">
                    <StudentDetailsPage/>
                    </TabPanel>
                    
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleCourseDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="courseDetails"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
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

export default connect(mapState, mapDispatch)(SingleCourseDetailsPage);
