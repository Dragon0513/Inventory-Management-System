import type {
    ActionFunction,
    MetaFunction,
    LoaderFunction,
} from "@remix-run/node"
import type { Product, ProductType } from "~/types"
import type { AxiosError } from "axios"
import { json, redirect } from "@remix-run/node"
import {
    Form,
    useActionData,
    useLoaderData,
    useTransition,
} from "@remix-run/react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import axios from "axios"
import Button from "~/components/Button"
import config from "~/config"
import { getUserJwt } from "~/utils/session.server"

const SERVER_URL = config.SERVER_URL

export const meta: MetaFunction = () => ({
    title: "Add new sale",
})

type ActionData = {
    formError?: string
    fieldErrors?: {
        productId: string | undefined
        quantity: string | undefined
    }
    fields?: {
        productId: string
        quantity: string
    }
}

export function validateQuantity(quantity: unknown) {
    if (typeof quantity !== "string" || quantity.length < 1) {
        return "quantity is required"
    } else {
        if (parseInt(quantity) <= 0) {
            return `quantity can't be negative`
        }
    }
}
export function validateProductId(productId: unknown) {
    if (typeof productId !== "string") {
        return `Invalid product id`
    }
}
export const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }) => {
    const jwt = await getUserJwt(request)
    const form = await request.formData()
    const productId = form.get("productId")
    const quantity = form.get("quantity")
    if (typeof productId !== "string" || typeof quantity !== "string") {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        productId,
        quantity,
    }
    const fieldErrors = {
        productId: validateProductId(productId),
        quantity: validateQuantity(quantity),
    }

    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    try {
        const productRes = await axios.get(
            `${SERVER_URL}/api/products/${productId}`
        )
        const product: { data: Product } = productRes.data
        console.log("product", product)
        if (product.data.attributes?.quantity < parseInt(quantity)) {
            return badRequest({
                formError: "Not enough products in stock",
                fields,
            })
        } else {
            await axios.post(
                `${SERVER_URL}/api/sales`,
                {
                    data: {
                        quantity,
                        product: productId,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            await axios.put(
                `${SERVER_URL}/api/products/${productId}`,
                {
                    data: {
                        quantity:
                            product.data.attributes?.quantity -
                            parseInt(quantity),
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            return redirect(`/sales/all`)
        }
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

type LoaderData = {
    products: ProductType
}

export const loader: LoaderFunction = async ({ request }) => {
    const productsResponse = await axios.get(`${SERVER_URL}/api/products`)
    const products = productsResponse.data
    return json({ products } as LoaderData)
}

function Add() {
    const actionData = useActionData<ActionData>()
    const loaderData = useLoaderData<LoaderData>()
    const transition = useTransition()

    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    New sale
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
                        <label className="block text-sm mt-5">
                            <span className="text-gray-700 dark:text-gray-400">
                                Product<span className="text-red-600">*</span>
                            </span>
                            <select
                                name="productId"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                            >
                                {loaderData.products.data.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.attributes.name} - (
                                        {product.attributes.quantity} available)
                                    </option>
                                ))}
                            </select>
                            {actionData?.fieldErrors?.productId ? (
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    {actionData.fieldErrors.productId}
                                </span>
                            ) : null}
                        </label>

                        <label className="block mt-4 text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Quantity
                                <span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="quantity"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                defaultValue={actionData?.fields?.quantity}
                                aria-invalid={Boolean(
                                    actionData?.fieldErrors?.quantity
                                )}
                                aria-errormessage={
                                    actionData?.fieldErrors?.quantity
                                        ? "quantity-error"
                                        : undefined
                                }
                            />
                            {actionData?.fieldErrors?.quantity ? (
                                <span className="text-xs text-red-600 dark:text-red-400">
                                    {actionData.fieldErrors.quantity}
                                </span>
                            ) : null}
                        </label>
                        <Button
                            className="mt-8 flex items-center justify-center"
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
