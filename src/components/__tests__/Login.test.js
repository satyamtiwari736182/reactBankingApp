/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "../../utils/test-utils";
import Login from '../Login';
import userEvent from "@testing-library/user-event";

test('rendering Login and creating wallet', async () => {
    const user = userEvent.setup();
    render(<Login />);
    const login = screen.getByRole("button");
    const username = screen.getByLabelText("UserName");
    const password = screen.getByLabelText("Password");
    await user.type(username, "test");
    await user.type(password, "test");
    await user.click(login);
    // expect(login).toHaveTextContent("Create");
    // screen.debug();
});

test("testing login link", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const register = screen.getByText("Register");
    expect(register).toHaveTextContent("Register");
    await user.click(register);
    // screen.debug();
});
