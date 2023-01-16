import { render, screen } from "test/test-utils"
import userEvent from "@testing-library/user-event"
import MobileSidebar from "~/components/SideBar/MobileSidebar"
import { sideBarMenus } from "~/components/SideBar/SideBarHelper"
import * as ThemeProviders from "~/context/ThemeContext"

describe("MobileSidebar component testing", () => {
    const user = userEvent.setup()
    const setIsSideMenuOpen = vi.fn()
    beforeEach(() => {
        vi.spyOn(ThemeProviders, "useThemeProvider").mockImplementation(() => ({
            isSideMenuOpen: true,
            setIsSideMenuOpen,
            isDarkMode: true,
            setIsDarkMode: vi.fn(),
            toggleDarkMode: vi.fn(),
        }))
    })
    afterEach(() => {
        vi.clearAllMocks()
        vi.restoreAllMocks()
    })
    const title = "IMS - Fantastic 5"
    // Test 1 - renders MobileSidebar
    test("renders MobileSidebar with title", () => {
        render(<MobileSidebar title={title} menus={[]} />)
        // screen.debug()
        const titleElement = screen.getByRole("link", {
            name: title,
        })
        expect(titleElement).toHaveTextContent(title)
    })

    // Test 2 - renders all sidebar links
    test("renders all MobileSidebar menus", () => {
        render(<MobileSidebar title={title} menus={sideBarMenus} />)
        // screen.debug()
        const parentMenuElement = screen.queryAllByLabelText(
            "sidebar-parent-menu"
        )
        expect(parentMenuElement.length).toEqual(sideBarMenus.length)
    })

    // Test 3 - click overlay to close the sidebar
    test("Click overlay to close the MobileSidebar", async () => {
        render(<MobileSidebar title={title} menus={sideBarMenus} />)
        const overlayElement = screen.getByLabelText("mobile-sidebar-overlay")

        expect(overlayElement).toBeInTheDocument()
        await user.click(overlayElement)
        expect(setIsSideMenuOpen).toHaveBeenCalled()
        expect(setIsSideMenuOpen).toHaveBeenCalledTimes(1)
    })
})
