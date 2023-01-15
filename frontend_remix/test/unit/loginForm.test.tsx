import type { ActionData } from "~/routes/login"
import type { Transition } from "@remix-run/react/dist/transition"
import LoginForm from "~/components/Login/LoginForm"
import { render, screen } from "@testing-library/react"
import { useSearchParams } from "@remix-run/react"

// Mocking remix-run/react module
vi.mock("@remix-run/react", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await vi.importActual<typeof import("@remix-run/react")>(
        "@remix-run/react"
    )
    const Form = ({ children }: { children: React.ReactNode }) => (
        <form>{children}</form>
    )
    const useSearchParams = () => [{ get: vi.fn() }]
    return { ...actual, useSearchParams, Form }
})

// Actual testing
describe("Testing Login Form", () => {
    let searchP = {} as URLSearchParams

    beforeAll(() => {
        const [searchParams] = useSearchParams()
        searchP = searchParams
    })
    afterAll(() => {
        vi.clearAllMocks()
    })
    //  Test 1 - Renders login form
    it("renders login form", async () => {
        let actionData = {} as ActionData | undefined
        let transition = { state: "idle" } as Transition
        render(
            <LoginForm
                actionData={actionData}
                searchParams={searchP}
                transition={transition}
            />
        )
        const emailField = screen.getByLabelText(/email/i)
        const passwordField = screen.getByLabelText(/password/i)
        const loginBtn = screen.getByRole("button", { name: /log in/i })
        expect(loginBtn).toBeInTheDocument()
        expect(emailField).toBeInTheDocument()
        expect(passwordField).toBeInTheDocument()
    })
    // Test 2 - Renders login form with loading state
    it("login form loading state", async () => {
        let actionData = {} as ActionData | undefined
        let transition = { state: "loading" } as Transition
        render(
            <LoginForm
                actionData={actionData}
                searchParams={searchP}
                transition={transition}
            />
        )
        // screen.debug()
        const loadingSvg = screen.getByLabelText(/Loading/i)
        expect(loadingSvg).toBeInTheDocument()
    })
    // Test 3 - Renders login form with error state
    it("login form errors state", async () => {
        const emailErrorMsg = "Invalid email address"
        const passErrorMsg = "Passwords must be at least 6 characters long"
        const formErrorMsg = "Username/Password combination is incorrect"
        let actionData = {
            fieldErrors: {
                email: emailErrorMsg,
                password: passErrorMsg,
            },
            formError: formErrorMsg,
        } as ActionData | undefined
        let transition = { state: "idle" } as Transition
        render(
            <LoginForm
                actionData={actionData}
                searchParams={searchP}
                transition={transition}
            />
        )
        // screen.debug()
        const emailError = screen.getByText(emailErrorMsg)
        const passError = screen.getByText(passErrorMsg)
        const formError = screen.getByText(formErrorMsg)
        expect(emailError).toBeInTheDocument()
        expect(passError).toBeInTheDocument()
        expect(formError).toBeInTheDocument()
    })
})
