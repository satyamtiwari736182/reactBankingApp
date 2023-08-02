/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "../../utils/test-utils";
import Banking from '../Banking';
import userEvent from "@testing-library/user-event";


test('rendering Banking', async () => {
    const user = userEvent.setup();
    render(<Banking />);
    const amount = screen.getByTestId("test-recharge")
    expect(amount).toBeInTheDocument();
    const recharge = screen.getByText("Recharge");
    await user.type(amount, "10");
    await user.click(recharge);
    screen.debug();
});

