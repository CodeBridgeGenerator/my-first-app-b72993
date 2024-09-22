import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const StudentDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [courseID, setCourseID] = useState([])

    useEffect(() => {
        let init  = {DOB:new Date()};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [courseID], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.stuId)) {
                error["stuId"] = `StuId field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.stuName)) {
                error["stuName"] = `StuName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.address)) {
                error["address"] = `Address field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            stuId: _entity?.stuId,stuName: _entity?.stuName,DOB: _entity?.DOB,courseID: _entity?.courseID?._id,address: _entity?.address,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("studentDetails").create(_data);
        const eagerResult = await client
            .service("studentDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "courseID",
                    service : "courseDetails",
                    select:["courseID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info StudentDetails updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in StudentDetails" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount courseDetails
                    client
                        .service("courseDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCourseDetailsId } })
                        .then((res) => {
                            setCourseID(res.data.map((e) => { return { name: e['courseID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CourseDetails", type: "error", message: error.message || "Failed get courseDetails" });
                        });
                }, []);

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
        <Dialog header="Create StudentDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="studentDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stuId">StuId:</label>
                <InputText id="stuId" className="w-full mb-3 p-inputtext-sm" value={_entity?.stuId} onChange={(e) => setValByKey("stuId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stuId"]) ? (
              <p className="m-0" key="error-stuId">
                {error["stuId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stuName">StuName:</label>
                <InputTextarea id="stuName" rows={5} cols={30} value={_entity?.stuName} onChange={ (e) => setValByKey("stuName", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stuName"]) ? (
              <p className="m-0" key="error-stuName">
                {error["stuName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="DOB">DOB:</label>
                <Calendar id="DOB" value={_entity?.DOB ? new Date(_entity?.DOB) : new Date()} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("DOB", new Date(e.target.value))} showIcon showButtonBar  inline showWeek  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["DOB"]) ? (
              <p className="m-0" key="error-DOB">
                {error["DOB"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="courseID">CourseID:</label>
                <Dropdown id="courseID" value={_entity?.courseID?._id} optionLabel="name" optionValue="value" options={courseIDOptions} onChange={(e) => setValByKey("courseID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["courseID"]) ? (
              <p className="m-0" key="error-courseID">
                {error["courseID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="address">Address:</label>
                <InputText id="address" className="w-full mb-3 p-inputtext-sm" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["address"]) ? (
              <p className="m-0" key="error-address">
                {error["address"]}
              </p>
            ) : null}
          </small>
            </div>
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
