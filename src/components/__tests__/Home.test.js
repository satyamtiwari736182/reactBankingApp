import { render, screen } from "../../utils/test-utils";
import Home from "../Home";
test("Testing Home Component", async () => {
    render(<Home />)
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
})