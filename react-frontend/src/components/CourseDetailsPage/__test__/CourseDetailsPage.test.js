import React from "react";
import { render, screen } from "@testing-library/react";

import CourseDetailsPage from "../CourseDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CourseDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("courseDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("courseDetails-add-button")).toBeInTheDocument();
});
