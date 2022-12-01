import type { ActionFunction, MetaFunction } from "@remix-run/node"
import { redirect, json } from "@remix-run/node"
import { Form, useActionData, useTransition } from "@remix-run/react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import type { AxiosError } from "axios"
import axios from "axios"
import Button from "~/components/Button"
import config from "~/config"
import { getUserJwt } from "~/utils/session.server"

const SERVER_URL = config.SERVER_URL

export const meta: MetaFunction = () => ({
    title: "Add new product",
})

function validateName(name: unknown) {
    if (typeof name !== "string" || name.length < 2) {
        return `Category name is too short`
    }
}

type ActionData = {
    formError?: string
    fieldErrors?: {
        name: string | undefined
    }
    fields?: {
        name: string
    }
}
const badRequest = (data: ActionData) => json(data, { status: 400 })
export const action: ActionFunction = async ({ request }) => {
    const jwt = await getUserJwt(request)
    const form = await request.formData()
    const name = form.get("name")
    if (typeof name !== "string") {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        name,
    }
    const fieldErrors = {
        name: validateName(name),
    }

    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    try {
        await axios.post(
            `${SERVER_URL}/api/categories`,
            {
                data: {
                    name,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
        return redirect(`/categories/all`)
    } catch (error) {
        const err = error as AxiosError

        console.log(err.response?.data)
        return badRequest({
            formError: "Something is wrong, please try again.",
            fields,
        })
    }
    // return null
}

function Add() {
    const actionData = useActionData<ActionData>()
    const transition = useTransition()
    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    New category
                </h2>
                <div id="form-error-message">
                    {actionData?.formError ? (
                        <p className="text-red-600 mt-2" role="alert">
                            {actionData.formError}
                        </p>
                    ) : null}
                </div>
                <Form
                    method="post"
                    className="flex flex-col lg:flex-row gap-5"
                    encType="multipart/form-data"
                >
                    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                        <label className="block text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Name<span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="name"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                defaultValue={actionData?.fields?.name}
                                aria-invalid={Boolean(
                                    actionData?.fieldErrors?.name
                                )}
                                aria-errormessage={
                                    actionData?.fieldErrors?.name
                                        ? "name-error"
                                        : undefined
                                }
                            />
                            {actionData?.fieldErrors?.name ? (
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    {actionData.fieldErrors.name}
                                </span>
                            ) : null}
                        </label>
                    </div>
                    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:w-1/4">
                        <Button
                            className="mt-5 w-full flex items-center justify-center"
                            type="submit"
                            disabled={transition.state === "submitting"}
                        >
                            {transition.state !== "idle" ? (
                                <AiOutlineLoading3Quarters
                                    size="1.5rem"
                                    className="animate-spin"
                                />
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default Add
