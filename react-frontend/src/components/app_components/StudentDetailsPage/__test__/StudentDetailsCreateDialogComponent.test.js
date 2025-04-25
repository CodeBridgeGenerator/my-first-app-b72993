import React from "react";
import { render, screen } from "@testing-library/react";

import StudentDetailsCreateDialogComponent from "../StudentDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders studentDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("studentDetails-create-dialog-component")).toBeInTheDocument();
});
