import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
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

const StudentDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [courseID, setCourseID] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount courseDetails
                    client
                        .service("courseDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCourseDetailsId } })
                        .then((res) => {
                            setCourseID(res.data.map((e) => { return { name: e['courseID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "CourseDetails", type: "error", message: error.message || "Failed get courseDetails" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            stuId: _entity?.stuId,
stuName: _entity?.stuName,
DOB: _entity?.DOB,
courseID: _entity?.courseID?._id,
address: _entity?.address,
        };

        setLoading(true);
        try {
            
        await client.service("studentDetails").patch(_entity._id, _data);
        const eagerResult = await client
            .service("studentDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "courseID",
                    service : "courseDetails",
                    select:["courseID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info studentDetails updated successfully" });
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

    const courseIDOptions = courseID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit StudentDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="studentDetails-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stuId">StuId:</label>
                <InputText id="stuId" className="w-full mb-3 p-inputtext-sm" value={_entity?.stuId} onChange={(e) => setValByKey("stuId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stuId"]) && (
              <p className="m-0" key="error-stuId">
                {error["stuId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="stuName">StuName:</label>
                <InputText id="stuName" className="w-full mb-3 p-inputtext-sm" value={_entity?.stuName} onChange={(e) => setValByKey("stuName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stuName"]) && (
              <p className="m-0" key="error-stuName">
                {error["stuName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="DOB">DOB:</label>
                <Calendar id="DOB" value={_entity?.DOB ? new Date(_entity?.DOB) : null} onChange={ (e) => setValByKey("DOB", new Date(e.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["DOB"]) && (
              <p className="m-0" key="error-DOB">
                {error["DOB"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="courseID">CourseID:</label>
                <Dropdown id="courseID" value={_entity?.courseID?._id} optionLabel="name" optionValue="value" options={courseIDOptions} onChange={(e) => setValByKey("courseID", {_id : e.value})}  />
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
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) && (
              <p className="m-0" key="error-address">
                {error["address"]}
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

export default connect(mapState, mapDispatch)(StudentDetailsCreateDialogComponent);
