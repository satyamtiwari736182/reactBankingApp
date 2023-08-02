import { render, screen } from "../../utils/test-utils";
import Home from "../Home";
import ProtectedWrapper from "../ProtectedWrapper";

test("partial protected", () => {
    render(<ProtectedWrapper component={Home} />);
})