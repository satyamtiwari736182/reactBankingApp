/_ eslint-disable testing-library/no-debugging-utils _/

import { render, screen } from "../../utils/test-utils";
import Header from "../Header";
import userEvent from '@testing-library/user-event'

test("testing header component", () => {
render(<Header />);
const heading = screen.getByRole("heading");
expect(heading).toHaveTextContent("Wallet Banking")
const logo = screen.getByTestId("test-logo");
expect(logo.src).toBe("https://w1.pngwing.com/pngs/320/650/png-transparent-money-logo-cryptocurrency-wallet-debt-finance-bank-saving-guarantee-business.png")

    const linkElement = screen.getAllByRole('link');
    expect(linkElement.length).toBe(4);

});
test("testing login", async () => {
const user = userEvent.setup();
render(<Header />);
const login = screen.getByText("Login")
expect(login).toBeInTheDocument();
await user.click(login);
screen.debug();
// expect(screen.getByLabelText("UserName")).toBeInTheDocument();
})
