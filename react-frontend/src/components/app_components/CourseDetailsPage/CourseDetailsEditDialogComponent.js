import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CourseDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [departmentID, setDepartmentID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount departmentDetails
                    client
                        .service("departmentDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDepartmentDetailsId } })
                        .then((res) => {
                            setDepartmentID(res.data.map((e) => { return { name: e['departmentID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "DepartmentDetails", type: "error", message: error.message || "Failed get departmentDetails" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            courseID: _entity?.courseID,
courseName: _entity?.courseName,
departmentID: _entity?.departmentID?._id,
Lecturer: _entity?.Lecturer,
        };

        setLoading(true);
        try {
            
        await client.service("courseDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("courseDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "departmentID",
                    service : "departmentDetails",
                    select:["departmentID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info courseDetails updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const departmentIDOptions = departmentID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit CourseDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="courseDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="courseID">CourseID:</label>
                <InputText id="courseID" className="w-full mb-3 p-inputtext-sm" value={_entity?.courseID} onChange={(e) => setValByKey("courseID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["courseID"]) && (
              <p className="m-0" key="error-courseID">
                {error["courseID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="courseName">CourseName:</label>
                <InputText id="courseName" className="w-full mb-3 p-inputtext-sm" value={_entity?.courseName} onChange={(e) => setValByKey("courseName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["courseName"]) && (
              <p className="m-0" key="error-courseName">
                {error["courseName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="departmentID">DepartmentID:</label>
                <Dropdown id="departmentID" value={_entity?.departmentID?._id} optionLabel="name" optionValue="value" options={departmentIDOptions} onChange={(e) => setValByKey("departmentID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["departmentID"]) && (
              <p className="m-0" key="error-departmentID">
                {error["departmentID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Lecturer">Lecturer:</label>
                <InputText id="Lecturer" className="w-full mb-3 p-inputtext-sm" value={_entity?.Lecturer} onChange={(e) => setValByKey("Lecturer", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Lecturer"]) && (
              <p className="m-0" key="error-Lecturer">
                {error["Lecturer"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CourseDetailsCreateDialogComponent);
