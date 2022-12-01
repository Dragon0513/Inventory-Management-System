import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import type { Categories } from "~/types"
import { json } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import axios from "axios"
import config from "~/config"
import Button from "~/components/Button"
import { getUserJwt } from "~/utils/session.server"

const SERVER_URL = config.SERVER_URL

export const meta: MetaFunction = () => ({
    title: "Categories",
})

// type ActionData = {
//     formError?: string
// }

export const action: LoaderFunction = async ({ request }) => {
    const jwt = await getUserJwt(request)
    let formData = await request.formData()
    let action = formData.get("action")
    let categoryId = formData.get("id")
    switch (action) {
        case "update": {
            // do your update
            // return updateProjectName(formData.get("name"));
            return null
        }
        case "delete": {
            // do your delete
            // return deleteStuff(formData);
            try {
                await axios.delete(
                    `${SERVER_URL}/api/categories/${categoryId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                )
                // const deleteProduct = deleteResponse.data
                return null
                // deleteResponse.
            } catch (error) {
                return null
            }
        }
        default: {
            throw new Error("Unexpected action")
        }
    }
}

export const loader: LoaderFunction = async () => {
    const response = await axios.get(
        `${SERVER_URL}/api/categories?populate=products`
    )
    const categories: Categories = response.data
    return json(categories)
}

function CategoriesList() {
    const categories = useLoaderData<Categories>()
    // console.log(products)
    return (
        <main className="h-full pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
                {/* <!-- With actions --> */}
                <div className="flex justify-between items-center">
                    <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Categories
                    </h2>

                    <Button href="/categories/add" className="px-5">
                        Add new
                    </Button>
                </div>
                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">
                                        Total Products
                                    </th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {categories?.data?.map((category) => (
                                    <tr
                                        className="text-gray-700 dark:text-gray-400"
                                        key={category.id}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold">
                                                        {
                                                            category.attributes
                                                                .name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {
                                                category.attributes.products
                                                    ?.data.length
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <Link
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                    to={`/categories/${category.id}`}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                                    </svg>
                                                </Link>
                                                <Form
                                                    method="post"
                                                    onSubmit={(event) => {
                                                        if (
                                                            !confirm(
                                                                "If you delete this category, you'll also delete the product category property. Are you sure?"
                                                            )
                                                        ) {
                                                            event.preventDefault()
                                                        }
                                                    }}
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="id"
                                                        value={category.id}
                                                    />
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Delete"
                                                        name="action"
                                                        value="delete"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </Form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CategoriesList

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-red-600 border-2 border-indigo-400 bg-indigo-800 bg-opacity-10 rounded-md m-2">
            <h1>Something is wrong</h1>
            <p>{error.message}</p>
        </div>
    )
}
