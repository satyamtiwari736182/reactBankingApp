import { render } from '@testing-library/react'
import { Provider } from "react-redux";
import store from "../store/store"
// import { StaticRouter } from "react-router-dom/server";
import { BrowserRouter } from 'react-router-dom';
const AllTheProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
            </Provider>
        </BrowserRouter>
    )
}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
