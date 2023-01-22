import type { User } from "~/types"
import { dummyUser, render, screen } from "../test-utils"
import DesktopSidebar from "~/components/SideBar/DesktopSidebar"
import { sideBarMenus } from "~/components/SideBar/SideBarHelper"
import * as AuthProviders from "~/context/AuthProvider"

afterEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
})
const title = "IMS - Fantastic 5"
// Test 1 - renders DesktopSidebar
test("renders DesktopSidebar with title", () => {
    render(<DesktopSidebar title={title} menus={[]} />)
    // screen.debug()
    const titleElement = screen.getByRole("link", {
        name: title,
    })
    expect(titleElement).toHaveTextContent(title)
})
// Test 2 - renders all sidebar links
test("renders all DesktopSidebar menus", () => {
    render(<DesktopSidebar title={title} menus={sideBarMenus} />)
    // screen.debug()
    const parentMenuElement = screen.queryAllByLabelText("sidebar-parent-menu")
    expect(parentMenuElement.length).toEqual(sideBarMenus.length)
})
// Test 3 - renders DesktopSidebar with empty menu
test("render DesktopSidebar with empty menu", () => {
    render(<DesktopSidebar title={title} menus={[]} />)
    // screen.debug()
    const parentMenuElement = screen.queryAllByLabelText("sidebar-parent-menu")
    expect(parentMenuElement.length).toEqual(0)
})
// Test 4 - renders DesktopSidebar with seller access
test("render DesktopSidebar with Seller access", () => {
    const userAccessOptions = ["Dashboard", "Sales", "Sales Report"]
    const mockUser: User = {
        ...dummyUser,
        role: { ...dummyUser.role, name: "Seller" },
    }
    vi.spyOn(AuthProviders, "useAuthProvider").mockImplementation(
        () => mockUser
    )

    render(<DesktopSidebar title={title} menus={sideBarMenus} />)

    const parentMenuElement = screen.queryAllByLabelText("sidebar-parent-menu")
    expect(parentMenuElement.length).toEqual(userAccessOptions.length)
    userAccessOptions.forEach((optionName, index) => {
        expect(parentMenuElement[index]).toHaveTextContent(optionName)
    })
})
// Test 4 - renders DesktopSidebar with moderator access
test("render DesktopSidebar with Moderator access", () => {
    const userAccessOptions = ["Dashboard", "Products", "Categories"]
    const mockUser: User = {
        ...dummyUser,
        role: { ...dummyUser.role, name: "Moderator" },
    }
    vi.spyOn(AuthProviders, "useAuthProvider").mockImplementation(
        () => mockUser
    )

    render(<DesktopSidebar title={title} menus={sideBarMenus} />)

    const parentMenuElement = screen.queryAllByLabelText("sidebar-parent-menu")
    expect(parentMenuElement.length).toEqual(userAccessOptions.length)
    userAccessOptions.forEach((optionName, index) => {
        expect(parentMenuElement[index]).toHaveTextContent(optionName)
    })
})
