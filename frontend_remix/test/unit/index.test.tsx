import { render, screen } from "../test-utils"
import DesktopSidebar from "~/components/SideBar/DesktopSidebar"
import { sideBarMenus } from "~/components/SideBar/SideBarHelper"

describe("Index testing", () => {
    test("renders learn react link", () => {
        render(<DesktopSidebar />)
        // screen.debug()
        expect(screen.getByText("IMS - Fantastic 5")).toBeInTheDocument()
    })
    test("renders all sidebar links", () => {
        render(<DesktopSidebar />)
        // screen.debug()
        const dashBoardLinkElement = screen.getAllByLabelText(
            "sidebar-parent-menu"
        )
        expect(dashBoardLinkElement.length).toEqual(sideBarMenus.length)
    })
})
