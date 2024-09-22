import React from "react";
import { render, screen } from "@testing-library/react";

import DepartmentDetailsPage from "../DepartmentDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders departmentDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DepartmentDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("departmentDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("departmentDetails-add-button")).toBeInTheDocument();
});
