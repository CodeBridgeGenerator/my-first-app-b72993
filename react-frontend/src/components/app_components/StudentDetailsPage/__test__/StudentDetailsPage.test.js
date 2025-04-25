import React from "react";
import { render, screen } from "@testing-library/react";

import StudentDetailsPage from "../StudentDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders studentDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("studentDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("studentDetails-add-button")).toBeInTheDocument();
});
