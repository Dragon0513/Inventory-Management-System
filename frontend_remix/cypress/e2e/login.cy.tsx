import { sideBarMenusTotalSize } from "../../app/components/SideBar/SideBarHelper"

describe("Admin workflow", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("Check dashboard data", () => {
        cy.get("html").should("have.class", "dark")

        cy.findByRole("textbox", { name: /email/i }).type(
            "testadmin@gmail.com",
            { force: true }
        )

        cy.findByLabelText(/password/i).type("test123")
        cy.findByRole("button", { name: /log in/i })
            .should("not.be.disabled")
            .click()
        cy.url().should("include", "/dashboard")

        cy.findByRole("main").within(() => {
            cy.findByRole("heading", { name: /home dashboard/i }).should(
                "exist"
            )
        })

        cy.findByRole("complementary").within(() => {
            cy.findAllByRole("listitem").should(
                "have.length",
                sideBarMenusTotalSize
            )
            // cy.wait(100)
            // cy.findByRole("link", { name: /sales list/i }).click()
            // cy.wait(100)
            // cy.findByRole("link", { name: /add new sale/i }).click()
        })
    })
})
