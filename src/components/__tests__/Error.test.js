import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Error from '../Error';
import routesConfig from "../../routes/Router"

const mockStore = configureMockStore([thunk]);

describe('Error component', () => {
    test('should render with valid error data from Redux', async () => {
        const errorData = {
            status: 404,
            data: 'Page not found',
        };

        const store = mockStore({ error: errorData });
        const router = createMemoryRouter(routesConfig, { initialEntries: ["/errors"] });

        render(
            <Provider store={store}>
                <RouterProvider router={router}>
                    <Error />
                </RouterProvider>
            </Provider>
        );
        // eslint-disable-next-line testing-library/no-debugging-utils
        // screen.debug();
        const statusText = screen.getByText(/status/);
        expect(statusText).toBeInTheDocument();
     
    });
});
