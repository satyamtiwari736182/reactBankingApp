import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Header from '../Header';
import routesConfig from "../../routes/Router"
import userEvent from "@testing-library/user-event";

const mockStore = configureMockStore([thunk]);

describe('Header component', () => {
    test('should render with valid error data from Redux', async () => {
        const user = userEvent.setup();
        const authData = {
            isAuth: true,
            hasWallet: false,
            token: ""
        }
        const store = mockStore({ auth: authData });
        const router = createMemoryRouter(routesConfig, { initialEntries: ["/"] });

        render(
            <Provider store={store}>
                <RouterProvider router={router}>
                    <Header />
                </RouterProvider>
            </Provider>
        );
        const logout = screen.getByText("Logout");
        expect(logout).toBeInTheDocument();
        await user.click(logout);
        // eslint-disable-next-line testing-library/no-debugging-utils
        // screen.debug();
    });
});
