import React from "react";
import { render, screen } from "@testing-library/react";

import DepartmentDetailsCreateDialogComponent from "../DepartmentDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders departmentDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("departmentDetails-create-dialog-component")).toBeInTheDocument();
});
