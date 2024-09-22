import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

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

const DepartmentDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.departmentID)) {
                error["departmentID"] = `DepartmentID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.depName)) {
                error["depName"] = `DepName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.HOD)) {
                error["HOD"] = `HOD field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            departmentID: _entity?.departmentID,depName: _entity?.depName,HOD: _entity?.HOD,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("departmentDetails").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info DepartmentDetails created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in DepartmentDetails" });
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

    

    return (
        <Dialog header="Create DepartmentDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="departmentDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="departmentID">DepartmentID:</label>
                <InputText id="departmentID" className="w-full mb-3 p-inputtext-sm" value={_entity?.departmentID} onChange={(e) => setValByKey("departmentID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["departmentID"]) ? (
              <p className="m-0" key="error-departmentID">
                {error["departmentID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="depName">DepName:</label>
                <InputText id="depName" className="w-full mb-3 p-inputtext-sm" value={_entity?.depName} onChange={(e) => setValByKey("depName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["depName"]) ? (
              <p className="m-0" key="error-depName">
                {error["depName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="HOD">HOD:</label>
                <InputText id="HOD" className="w-full mb-3 p-inputtext-sm" value={_entity?.HOD} onChange={(e) => setValByKey("HOD", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["HOD"]) ? (
              <p className="m-0" key="error-HOD">
                {error["HOD"]}
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

export default connect(mapState, mapDispatch)(DepartmentDetailsCreateDialogComponent);
