import axios from "axios"
import type { LoaderFunction } from "@remix-run/node"
import type { Categories, ProductType, Sales } from "~/types"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { classNames } from "~/utils"
import numeral from "numeral"
import config from "~/config"

const SERVER_URL = config.SERVER_URL

interface LoaderData {
    "Sales Revenue": string
    "Products Value": string
    "Total Products": string
    "Total Categories": string
}

export const loader: LoaderFunction = async () => {
    try {
        const productRes = await axios.get(`${SERVER_URL}/api/products`)
        const categoriesRes = await axios.get(`${SERVER_URL}/api/categories`)
        const saleRes = await axios.get(
            `${SERVER_URL}/api/sales?populate=product`
        )
        const products: ProductType = productRes.data
        const categories: Categories = categoriesRes.data
        const sales: Sales = saleRes.data
        const data: LoaderData = {
            "Products Value":
                "৳ " +
                numeral(
                    products.data.reduce(
                        (total, item) =>
                            total +
                            item.attributes.price * item.attributes.quantity,
                        0
                    )
                ).format("0,0"),
            "Total Products": products.data.length + "",
            "Total Categories": categories.data.length + "",
            "Sales Revenue":
                "৳ " +
                numeral(
                    sales.data.reduce(
                        (total, sale) =>
                            total +
                            sale.attributes?.product?.data?.attributes?.price *
                                sale.attributes?.quantity,
                        0
                    )
                ).format("0,0"),
        }
        return json(data)
    } catch (error) {
        throw new Error("Something is wrong")
    }
}

const cards = [
    {
        id: 1,
        title: "Sales Revenue",
        value: "$0",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        color: "text-orange-500 bg-orange-100 dark:text-orange-100 dark:bg-orange-500",
    },
    {
        id: 2,
        title: "Products Value",
        value: "$ 46,760.89",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
            </svg>
        ),
        color: "text-green-500 bg-green-100 dark:text-green-100 dark:bg-green-500",
    },
    {
        id: 3,
        title: "Total Products",
        value: "376",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
            </svg>
        ),
        color: "text-blue-500 bg-blue-100 dark:text-blue-100 dark:bg-blue-500",
    },
    {
        id: 4,
        title: "Total Categories",
        value: "35",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                />
            </svg>
        ),
        color: "text-teal-500 bg-teal-100 dark:text-teal-100 dark:bg-teal-500",
    },
]

function Card({ title, value, icon, color }: typeof cards[0]) {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className={classNames("p-3 mr-4 rounded-full", color)}>
                {icon}
            </div>
            <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {value}
                </p>
            </div>
        </div>
    )
}

function Index() {
    const products = useLoaderData<LoaderData>()
    // console.log("products ", products)
    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Home Dashboard
                </h2>
                {/* <!-- Cards --> */}

                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            {...card}
                            value={products[card.title as keyof LoaderData]}
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}

export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-red-600 border-2 border-indigo-400 bg-indigo-800 bg-opacity-10 rounded-md m-2">
            <h1>Something is wrong</h1>
            <p>{error.message}</p>
        </div>
    )
}

export default Index
