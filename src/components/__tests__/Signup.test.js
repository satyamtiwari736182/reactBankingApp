/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "../../utils/test-utils";
import Signup from '../Signup';
import userEvent from "@testing-library/user-event";

test('rendering Signup and creating account', async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const username = screen.getByLabelText("Name");
    await user.type(username, "test");

    const email = screen.getByLabelText("Email");
    await user.type(email, "test@test.com");

    const phone = screen.getByLabelText("Phone");
    await user.type(phone, "1234");

    const password = screen.getByLabelText("Password");
    await user.type(password, "test");

    const cpassword = screen.getByLabelText("Confirm Password");
    await user.type(cpassword, "test");

    const submit = screen.getByRole("button");
    await user.click(submit);
});

test("testing login link", async () => {
    const user = userEvent.setup();
    render(<Signup />);
    const login = screen.getByText("Login");
    expect(login).toBeInTheDocument();
    await user.click(login);
    // screen.debug();
});