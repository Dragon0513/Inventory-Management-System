import type { Categories, Product, ProductStores } from "~/types"
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import {
    Form,
    useActionData,
    useLoaderData,
    useParams,
    useTransition,
} from "@remix-run/react"
import type { AxiosError } from "axios"
import axios from "axios"
import config from "~/config"
import Button from "~/components/Button"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { getUserJwt } from "~/utils/session.server"
import type { ActionData } from "./utils"
import {
    badRequest,
    validateName,
    validatePrice,
    validateQuantity,
} from "./utils"

const SERVER_URL = config.SERVER_URL

export const action: ActionFunction = async ({ request, params }) => {
    const jwt = await getUserJwt(request)
    const form = await request.formData()
    const name = form.get("name")
    const description = form.get("description")
    const price = form.get("price")
    const quantity = form.get("quantity")
    const categories = form.getAll("categories")
    const store = form.get("stores")
    if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof price !== "string" ||
        typeof quantity !== "string" ||
        typeof categories !== "object" ||
        typeof store !== "string"
    ) {
        return badRequest({
            formError: `Form not submitted correctly.`,
        })
    }

    const fields = {
        name,
        description,
        price,
        quantity,
        categories,
        store,
    }
    const fieldErrors = {
        name: validateName(name),
        price: validatePrice(price),
        quantity: validateQuantity(quantity),
    }

    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields })

    try {
        await axios.put(
            `${SERVER_URL}/api/products/${params.productId}`,
            {
                data: {
                    name,
                    quantity,
                    description,
                    categories,
                    store,
                    price,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
        return redirect(`/products/all`)
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
    product: { data: Product }
    categories: Categories
    stores: ProductStores
}

export const loader: LoaderFunction = async ({ params }) => {
    try {
        const res = await axios.get(
            `${SERVER_URL}/api/products/${params.productId}?populate=categories,store`
        )
        const product = res.data
        const catResponse = await axios.get(`${SERVER_URL}/api/categories`)
        const categories = catResponse.data
        const storeResponse = await axios.get(`${SERVER_URL}/api/stores`)
        const stores = storeResponse.data
        const data: LoaderData = { product, categories, stores }
        return json(data)
    } catch (error) {
        throw new Response("Something is wrong", {
            status: 404,
        })
    }
}

export const meta: MetaFunction = ({
    data,
}: {
    data: LoaderData | undefined
}) => {
    if (!data) {
        return {
            title: "Wrong path",
        }
    }
    return {
        title: `${data.product.data.attributes.name}`,
    }
}

function SingleProduct() {
    const loaderData = useLoaderData<LoaderData>()
    const actionData = useActionData<ActionData>()
    const transition = useTransition()
    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Update product
                </h2>
                <div id="form-error-message">
                    {actionData?.formError ? (
                        <p className="text-red-600 mt-2" role="alert">
                            {actionData.formError}
                        </p>
                    ) : null}
                </div>
                <Form method="post" className="flex flex-col lg:flex-row gap-5">
                    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
                        <label className="block text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Name<span className="text-red-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="name"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                defaultValue={
                                    loaderData.product.data.attributes.name
                                }
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

                        <label className="block mt-4 text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Description
                            </span>
                            <textarea
                                name="description"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                rows={3}
                                defaultValue={
                                    loaderData.product.data.attributes
                                        .description
                                }
                            ></textarea>
                        </label>

                        <div className="flex flex-col md:flex-row gap-10 mt-5">
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Price<span className="text-red-600">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="price"
                                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                    defaultValue={
                                        loaderData.product.data.attributes.price
                                    }
                                    aria-invalid={Boolean(
                                        actionData?.fieldErrors?.price
                                    )}
                                    aria-errormessage={
                                        actionData?.fieldErrors?.price
                                            ? "price-error"
                                            : undefined
                                    }
                                />
                                {actionData?.fieldErrors?.price ? (
                                    <span className="text-xs text-red-600 dark:text-red-400">
                                        {actionData.fieldErrors.price}
                                    </span>
                                ) : null}
                            </label>

                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Quantity
                                    <span className="text-red-600">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="quantity"
                                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                    defaultValue={
                                        loaderData.product.data.attributes
                                            .quantity
                                    }
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
                        </div>
                    </div>
                    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:w-1/4">
                        <label className="block mt-4 text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Categories
                            </span>

                            <select
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                multiple
                                name="categories"
                            >
                                {loaderData.categories.data.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                        selected={loaderData.product?.data?.attributes?.categories.data.some(
                                            (cat) => cat.id === category.id
                                        )}
                                    >
                                        {category.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-sm mt-5">
                            <span className="text-gray-700 dark:text-gray-400">
                                Store
                            </span>
                            <select
                                name="stores"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                            >
                                {loaderData.stores.data.map((store) => (
                                    <option
                                        key={store.id}
                                        value={store.id}
                                        selected={
                                            loaderData.product?.data?.attributes
                                                ?.store?.data?.id === store.id
                                        }
                                    >
                                        {store.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <Button
                            className="mt-8 w-full flex items-center justify-center"
                            type="submit"
                            disabled={transition.state === "submitting"}
                        >
                            {transition.state !== "idle" ? (
                                <AiOutlineLoading3Quarters
                                    size="1.5rem"
                                    className="animate-spin"
                                />
                            ) : (
                                "Update"
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    )
}

export default SingleProduct

export function ErrorBoundary() {
    const { productId } = useParams()
    return (
        <div className="error-container">{`Something is wrong to load ${productId} this ID's product. Sorry.`}</div>
    )
}
