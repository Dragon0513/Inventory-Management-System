import type { ActionData } from "~/routes/login"
import type { Transition } from "@remix-run/react/dist/transition"
import LoginForm from "~/components/Login/LoginForm"
import { render, screen } from "@testing-library/react"
import { useSearchParams } from "@remix-run/react"

let searchP = {} as URLSearchParams

// UI setup function
function Setup({
    actionData = {},
    transition = { state: "idle" },
}: {
    actionData?: ActionData | undefined
    transition?: Pick<Transition, "state">
}) {
    const utils = render(
        <LoginForm
            actionData={actionData}
            searchParams={searchP}
            transition={transition}
        />
    )
    return { ...utils }
}

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

beforeAll(() => {
    const [searchParams] = useSearchParams()
    searchP = searchParams
})
beforeEach(() => {
    vi.clearAllMocks()
})
afterAll(() => {
    vi.restoreAllMocks()
})

//  Test 1 - Renders login form
test("renders login form", async () => {
    // Setup UI
    Setup({})
    const emailField = screen.getByLabelText(/email/i)
    const passwordField = screen.getByLabelText(/password/i)
    const loginBtn = screen.getByRole("button", { name: /log in/i })
    expect(loginBtn).toBeInTheDocument()
    expect(emailField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()

    // check if searchParams.get is called
    expect(searchP.get).toHaveBeenCalled()
    expect(searchP.get).toHaveBeenCalledTimes(1)
})
// Test 2 - Renders login form with loading state
test("login form loading state", async () => {
    // Setup UI
    Setup({ transition: { state: "loading" } })
    // screen.debug()
    const loadingSvg = screen.getByLabelText(/Loading/i)
    expect(loadingSvg).toBeInTheDocument()

    // check if searchParams.get is called
    expect(searchP.get).toHaveBeenCalled()
    expect(searchP.get).toHaveBeenCalledTimes(1)
})
// Test 3 - Renders login form with error state
test("login form errors state", async () => {
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

    // Setup UI
    Setup({ actionData })
    // screen.debug()
    const emailError = screen.getByText(emailErrorMsg)
    const passError = screen.getByText(passErrorMsg)
    const formError = screen.getByText(formErrorMsg)
    expect(emailError).toHaveTextContent(emailErrorMsg)
    expect(passError).toHaveTextContent(passErrorMsg)
    expect(formError).toHaveTextContent(formErrorMsg)

    // check if searchParams.get is called
    expect(searchP.get).toHaveBeenCalled()
    expect(searchP.get).toHaveBeenCalledTimes(1)
})
