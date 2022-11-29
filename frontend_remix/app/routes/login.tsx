import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useActionData, useSearchParams } from "@remix-run/react"
import validator from "validator"
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

type ActionData = {
    formError?: string
    fieldErrors?: {
        email: string | undefined
        password: string | undefined
    }
    fields?: {
        email: string
        password: string
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
                            <Form method="post">
                                <input
                                    type="hidden"
                                    name="redirectTo"
                                    value={
                                        searchParams.get("redirectTo") ??
                                        undefined
                                    }
                                />
                                <label className="block text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">
                                        Email
                                    </span>
                                    <input
                                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="Jane Doe"
                                        type="email"
                                        name="identifier"
                                        defaultValue={actionData?.fields?.email}
                                        aria-invalid={Boolean(
                                            actionData?.fieldErrors?.email
                                        )}
                                        aria-errormessage={
                                            actionData?.fieldErrors?.email
                                                ? "email-error"
                                                : undefined
                                        }
                                    />
                                    {actionData?.fieldErrors?.email ? (
                                        <p
                                            className="text-red-600 mt-2"
                                            role="alert"
                                            id="email-error"
                                        >
                                            {actionData.fieldErrors.email}
                                        </p>
                                    ) : null}
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">
                                        Password
                                    </span>
                                    <input
                                        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        placeholder="***************"
                                        type="password"
                                        name="password"
                                        aria-invalid={
                                            Boolean(
                                                actionData?.fieldErrors
                                                    ?.password
                                            ) || undefined
                                        }
                                        aria-errormessage={
                                            actionData?.fieldErrors?.password
                                                ? "password-error"
                                                : undefined
                                        }
                                    />
                                    {actionData?.fieldErrors?.password ? (
                                        <p
                                            className="text-red-600 mt-2"
                                            role="alert"
                                            id="password-error"
                                        >
                                            {actionData.fieldErrors.password}
                                        </p>
                                    ) : null}
                                </label>

                                <div id="form-error-message">
                                    {actionData?.formError ? (
                                        <p
                                            className="text-red-600 mt-2"
                                            role="alert"
                                        >
                                            {actionData.formError}
                                        </p>
                                    ) : null}
                                </div>

                                {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    Log in
                                </button>
                            </Form>

                            <hr className="my-8" />

                            <p className="mt-4">
                                <a
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    href="./forgot-password.html"
                                >
                                    Forgot your password?
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
