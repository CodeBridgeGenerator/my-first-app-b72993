import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleStudentDetailsPage from "../components/app_components/StudentDetailsPage/SingleStudentDetailsPage";
import StudentDetailProjectLayoutPage from "../components/app_components/StudentDetailsPage/StudentDetailProjectLayoutPage";
import SingleCourseDetailsPage from "../components/app_components/CourseDetailsPage/SingleCourseDetailsPage";
import CourseDetailProjectLayoutPage from "../components/app_components/CourseDetailsPage/CourseDetailProjectLayoutPage";
import SingleDepartmentDetailsPage from "../components/app_components/DepartmentDetailsPage/SingleDepartmentDetailsPage";
import DepartmentDetailProjectLayoutPage from "../components/app_components/DepartmentDetailsPage/DepartmentDetailProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
<Route path="/studentDetails/:singleStudentDetailsId" exact element={<SingleStudentDetailsPage />} />
<Route path="/studentDetails" exact element={<StudentDetailProjectLayoutPage />} />
<Route path="/courseDetails/:singleCourseDetailsId" exact element={<SingleCourseDetailsPage />} />
<Route path="/courseDetails" exact element={<CourseDetailProjectLayoutPage />} />
<Route path="/departmentDetails/:singleDepartmentDetailsId" exact element={<SingleDepartmentDetailsPage />} />
<Route path="/departmentDetails" exact element={<DepartmentDetailProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
