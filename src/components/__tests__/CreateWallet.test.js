/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "../../utils/test-utils";
import CreateWallet from '../CreateWallet';
import userEvent from "@testing-library/user-event";

test('rendering CreateWallet and creating wallet', async () => {
    const user = userEvent.setup();
    render(<CreateWallet />);
    const create = screen.getByRole("button");
    const input = screen.getByLabelText("WalletId");
    await user.type(input, "123test");
    await user.click(create);
    expect(create).toHaveTextContent("Create");
    // screen.debug();
});

