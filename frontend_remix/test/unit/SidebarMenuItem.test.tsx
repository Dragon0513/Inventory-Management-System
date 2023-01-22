import type { SideBarMenuType } from "~/components/SideBar/SideBarHelper"
import { MdPointOfSale } from "react-icons/md"
import { SideBarMenuItem } from "~/components/SideBar/SideBarHelper"
import { render, screen } from "../test-utils"

const menuItem = {
    name: "Sales",
    url: "/sales/all",
    icon: <MdPointOfSale size="1.2rem" />,
}

// Test 1 - renders SideBarMenuItem
test("renders SideBarMenuItem with title and children", () => {
    const menu: SideBarMenuType = {
        ...menuItem,
        children: [
            {
                name: "Sales list",
                url: "/sales/all",
            },
            {
                name: "Add new sale",
                url: "/sales/add",
            },
        ],
    }
    render(<SideBarMenuItem item={menu} />)

    const menuTitleElement = screen.getByLabelText("sidebar-parent-menu")
    expect(menuTitleElement).toHaveTextContent(menu.name)
    const subMenuElements = screen.queryAllByLabelText("submenu")
    expect(subMenuElements.length).toEqual(menu.children?.length)
})

test("renders SideBarMenuItem with title only", () => {
    render(<SideBarMenuItem item={menuItem} />)

    const menuTitleElement = screen.getByLabelText("sidebar-parent-menu")
    expect(menuTitleElement).toHaveTextContent(menuItem.name)
})
