import type { ActionData } from "~/routes/login"
import type { Transition } from "@remix-run/react/dist/transition"
import { Form } from "@remix-run/react"
import Button from "../Button"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

function LoginForm({
    actionData,
    searchParams,
    transition,
}: {
    actionData: ActionData | undefined
    searchParams: URLSearchParams
    transition: Pick<Transition, "state">
}) {
    return (
        <Form method="post">
            <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get("redirectTo") ?? undefined}
            />
            <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                    placeholder="Jane Doe"
                    type="email"
                    name="identifier"
                    defaultValue={actionData?.fields?.email}
                    aria-invalid={Boolean(actionData?.fieldErrors?.email)}
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
                        Boolean(actionData?.fieldErrors?.password) || undefined
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
                    <p className="text-red-600 mt-2" role="alert">
                        {actionData.formError}
                    </p>
                ) : null}
            </div>
            {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
            <Button
                type="submit"
                disabled={transition.state === "submitting"}
                className="mt-8 w-full flex items-center justify-center"
            >
                {transition.state !== "idle" ? (
                    <AiOutlineLoading3Quarters
                        size="1.5rem"
                        className="animate-spin"
                        aria-label="Loading"
                    />
                ) : (
                    "Log in"
                )}
            </Button>
        </Form>
    )
}

export default LoginForm
