import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

function RootPage() {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    )
};

export default RootPage;