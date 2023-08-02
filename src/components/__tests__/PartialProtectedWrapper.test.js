import { render, screen } from "../../utils/test-utils";
import Home from "../Home";
import PartialProtectedWrapper from "../PartialProtectedWrapper";

test("partial protected", () => {
    render(<PartialProtectedWrapper component={Home} />);
})