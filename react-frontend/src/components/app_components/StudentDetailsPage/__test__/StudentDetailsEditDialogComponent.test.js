import React from "react";
import { render, screen } from "@testing-library/react";

import StudentDetailsEditDialogComponent from "../StudentDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders studentDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StudentDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("studentDetails-edit-dialog-component")).toBeInTheDocument();
});
