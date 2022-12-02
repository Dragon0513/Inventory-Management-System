import type { Categories, ProductStores } from "~/types"
import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    // UploadHandler,
} from "@remix-run/node"
import {
    json,
    redirect,
    // unstable_composeUploadHandlers as composeUploadHandlers,
    // unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    // unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node"
import {
    Form,
    useActionData,
    useLoaderData,
    useTransition,
} from "@remix-run/react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import type { AxiosError } from "axios"
import axios from "axios"
import Button from "~/components/Button"
import config from "~/config"
import { getUserJwt } from "~/utils/session.server"
import type { ActionData } from "./utils"
import {
    badRequest,
    validateName,
    validatePrice,
    validateQuantity,
} from "./utils"

const SERVER_URL = config.SERVER_URL

export const meta: MetaFunction = () => ({
    title: "Add new product",
})

export const action: ActionFunction = async ({ request }) => {
    const jwt = await getUserJwt(request)
    // const uploadHandler: UploadHandler = composeUploadHandlers(
    //     async ({ name, contentType, data, filename }) => {
    //         if (name !== "files") {
    //             return undefined
    //         }
    //         try {
    //             console.log("uploading ", name, contentType, filename, data)
    //             const formData = new FormData()
    //             formData.append("file", data, filename)
    //             const uploadResponse = await axios.post(
    //                 `${SERVER_URL}/api/upload`,
    //                 formData,
    //                 {
    //                     headers: {
    //                         "Content-Type": "multipart/form-data",
    //                         Authorization: `Bearer ${jwt}`,
    //                     },
    //                 }
    //             )
    //             const imageData = uploadResponse.data
    //             console.log("files", imageData)
    //             return imageData
    //         } catch (error) {
    //             const err = error as AxiosError
    //             console.log(err.response?.data)
    //             return err
    //         }
    //     },
    //     createMemoryUploadHandler()
    // )
    const form = await request.formData()
    const name = form.get("name")
    const description = form.get("description")
    const price = form.get("price")
    const quantity = form.get("quantity")
    const categories = form.getAll("categories")
    const store = form.get("stores")
    // const files = form.get("files")
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

    // console.log("fields", fields)
    // console.log("files", files)

    // try {
    //     let formData = new FormData()
    //     formData.append("files", files)
    //     const uploadResponse = await axios.post(
    //         `${SERVER_URL}/api/upload`,
    //         formData,
    //         {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //                 Authorization: `Bearer ${jwt}`,
    //             },
    //         }
    //     )
    //     const imageData = uploadResponse.data
    //     console.log("files", imageData)
    // } catch (error) {
    //     const err = error as AxiosError
    //     console.log(err)
    // }

    try {
        await axios.post(
            `${SERVER_URL}/api/products`,
            {
                data: {
                    name,
                    quantity,
                    description,
                    // image: -3474481,
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
    categories: Categories
    stores: ProductStores
}

export const loader: LoaderFunction = async ({ request }) => {
    const catResponse = await axios.get(`${SERVER_URL}/api/categories`)
    const categories = catResponse.data
    const storeResponse = await axios.get(`${SERVER_URL}/api/stores`)
    const stores = storeResponse.data
    return json({ categories, stores } as LoaderData)
}

function Add() {
    const actionData = useActionData<ActionData>()
    const loaderData = useLoaderData<LoaderData>()
    const transition = useTransition()

    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    New product
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

                        <label className="block mt-4 text-sm">
                            <span className="text-gray-700 dark:text-gray-400">
                                Description
                            </span>
                            <textarea
                                name="description"
                                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                rows={3}
                                defaultValue={actionData?.fields?.description}
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
                                    defaultValue={actionData?.fields?.price}
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

                            {/* <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Image
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="files"
                                    className="block w-full mt-1 text-sm dark:text-gray-300 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red form-input"
                                />
                            </label> */}
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
                                    <option key={store.id} value={store.id}>
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
