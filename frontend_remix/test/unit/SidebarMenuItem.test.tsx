import { MdPointOfSale } from "react-icons/md"
import { SideBarMenuItem } from "~/components/SideBar/SideBarHelper"
import { render, screen } from "../test-utils"

describe("SideBarMenuItem component testing", () => {
    // Test 1 - renders SideBarMenuItem
    test("renders SideBarMenuItem with title", () => {
        const menuItem = {
            name: "Sales",
            url: "/sales/all",
            icon: <MdPointOfSale size="1.2rem" />,
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
        render(<SideBarMenuItem item={menuItem} />)
        // screen.debug()
        const menuTitleElement = screen.getByLabelText("sidebar-parent-menu")
        expect(menuTitleElement).toHaveTextContent(menuItem.name)
        const subMenuElements = screen.queryAllByLabelText("submenu")
        expect(subMenuElements.length).toEqual(menuItem.children.length)
    })
})
