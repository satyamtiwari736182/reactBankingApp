/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "../../utils/test-utils";
import AccountStatement from '../AccountStatement';


test('rendering AccountStatement', () => {
    render(<AccountStatement />);
    // screen.debug();
});

