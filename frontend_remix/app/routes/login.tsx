import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { useActionData, useSearchParams, useTransition } from "@remix-run/react"
import validator from "validator"
import LoginForm from "~/components/Login/LoginForm"
import { login, createUserSession, getUserId } from "~/utils/session.server"

function validateEmail(email: unknown) {
    if (typeof email !== "string" || !validator.isEmail(email)) {
        return `Invalid email address`
    }
}

function validatePassword(password: unknown) {
    if (typeof password !== "string" || password.length < 6) {
        return `Passwords must be at least 6 characters long`
    }
}

function validateUrl(url: any) {
    console.log(url)
    let urls = [
        "/dashboard",
        "/products",
        "/products/list",
        "/products/add",
        "/",
        "https://remix.run",
    ]
    if (urls.includes(url)) {
        return url
    }
    return "/dashboard"
}

export type ActionData = {
    formError?: string
    fieldErrors?: {
        email?: string | undefined
        password?: string | undefined
    }
    fields?: {
        email?: string
        password?: string
    }
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const email = form.get("identifier")
    const password = form.get("password")
    const redirectTo = validateUrl(form.get("redirectTo") || "/dashboard")
    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof redirectTo !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = { email, password }
    const fieldErrors = {
        email: validateEmail(email),
        password: validatePassword(password),
    }
    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    const user = await login({ email, password })
    // console.log({ user })
    if (!user) {
        return badRequest({
            fields,
            formError: `Username/Password combination is incorrect`,
        })
    }
    return createUserSession(user.user.id, user.jwt, redirectTo)
}

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request)
    if (userId) {
        return redirect("/dashboard")
    }
    return null
}

function Login() {
    const actionData = useActionData<ActionData>()
    const [searchParams] = useSearchParams()
    const transition = useTransition()
    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="/img/login-office.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="/img/login-office-dark.jpeg"
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Login
                            </h1>
                            <LoginForm
                                actionData={actionData}
                                searchParams={searchParams}
                                transition={transition}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
