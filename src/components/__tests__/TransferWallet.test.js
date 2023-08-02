/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "../../utils/test-utils";
import TransferWallet from '../TransferWallet';
import userEvent from "@testing-library/user-event";

test('rendering TransferWallet and tranfer amount', async () => {
    const user = userEvent.setup();
    render(<TransferWallet />);
    const transfer = screen.getByRole("button");
    const input = screen.getByLabelText("Receiver walletId");
    const amount = screen.getByLabelText("Amount");
    await user.type(input, "123test");
    await user.type(amount, "100");
    await user.click(transfer);
    // screen.debug();
});

