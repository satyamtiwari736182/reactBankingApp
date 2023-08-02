import { render, screen } from "../../utils/test-utils";
import Footer from "../Footer";
import user from '@testing-library/user-event'

test("Testing footer Component", () => {
    render(<Footer />)
    const div = screen.getByText(/satyam/);
    expect(div).toBeInTheDocument();
});