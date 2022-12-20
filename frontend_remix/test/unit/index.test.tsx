// import { describe, test, expect } from "vitest"
import { render, screen } from "../test-utils"
import DesktopSidebar from "~/components/SideBar/DesktopSidebar"

describe("Index testing", () => {
    test("renders learn react link", () => {
        render(<DesktopSidebar />)
        expect(screen.getByText("IMS - Fantastic 5")).toBeInTheDocument()
    })
})
