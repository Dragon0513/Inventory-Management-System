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
            cy.findByText(/Sales Revenue/i).should("exist")
            cy.findByText(/Products Value/i).should("exist")
            cy.findByText(/Total Products/i).should("exist")
            cy.findByText(/Total Categories/i).should("exist")
        })

        cy.findByRole("complementary").within(async () => {
            cy.findAllByRole("listitem").should(
                "have.length",
                sideBarMenusTotalSize
            )
        })

        cy.findByRole("banner").within(() => {
            cy.findByRole("img", { hidden: true }).should("exist").click()
            cy.findByRole("menu").within(() => {
                cy.findByRole("menuitem", {
                    name: /Admin/i,
                }).should("exist")
                cy.findByRole("menuitem", { name: /Log out/i })
                    .should("exist")
                    .click()
            })
        })
        cy.url().should("include", "/login")
    })
})
