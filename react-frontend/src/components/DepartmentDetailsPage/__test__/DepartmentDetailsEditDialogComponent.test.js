import React from "react";
import { render, screen } from "@testing-library/react";

import DepartmentDetailsEditDialogComponent from "../DepartmentDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders departmentDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("departmentDetails-edit-dialog-component")).toBeInTheDocument();
});
