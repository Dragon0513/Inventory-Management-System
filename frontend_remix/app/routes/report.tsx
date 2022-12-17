import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import type { Sales } from "~/types"
import React from "react"
import { json } from "@remix-run/node"
import axios from "axios"
import Layout from "~/components/Layout"
import { requireUserId } from "~/utils/session.server"
import config from "~/config"
import { useLoaderData } from "@remix-run/react"
import numeral from "numeral"
import moment from "moment"
import Button from "~/components/Button"
import ReactToPrint from "react-to-print"

const SERVER_URL = config.SERVER_URL

export const meta: MetaFunction = () => {
    return {
        title: "Sales Report",
    }
}

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    const response = await axios.get(`${SERVER_URL}/api/sales?populate=product`)
    const sales: Sales = response.data
    return json(sales)
}

function Report() {
    const componentRef = React.useRef(null)

    const sales = useLoaderData<Sales>()
    const [renderSales, setRenderSales] = React.useState<Sales>(sales)
    React.useEffect(() => {
        setRenderSales(sales)
    }, [sales])

    const totalSales = React.useMemo(() => {
        return renderSales?.data.reduce((acc, sale) => {
            return (
                acc +
                sale.attributes.quantity *
                    sale.attributes.product.data.attributes.price
            )
        }, 0)
    }, [renderSales])

    const [reportBy, setReportBy] = React.useState("all")

    const handleReportByChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setReportBy(e.target.value)
        },
        []
    )

    React.useEffect(() => {
        if (reportBy === "all") {
            setRenderSales(sales)
        } else if (reportBy === "daily") {
            const dailySales = sales.data.filter((sale) => {
                return moment(sale.attributes.createdAt).isSame(moment(), "day")
            })
            setRenderSales({ data: dailySales })
        } else if (reportBy === "weekly") {
            const weeklySales = sales.data.filter((sale) => {
                return moment(sale.attributes.createdAt).isSame(
                    moment(),
                    "week"
                )
            })
            setRenderSales({ ...sales, data: weeklySales })
        } else if (reportBy === "monthly") {
            const monthlySales = sales.data.filter((sale) => {
                return moment(sale.attributes.createdAt).isSame(
                    moment(),
                    "month"
                )
            })
            setRenderSales({ data: monthlySales })
        } else if (reportBy === "yearly") {
            const yearlySales = sales.data.filter((sale) => {
                return moment(sale.attributes.createdAt).isSame(
                    moment(),
                    "year"
                )
            })
            setRenderSales({ data: yearlySales })
        }
    }, [reportBy, sales])
    console.log("renderSales", renderSales)

    return (
        <Layout>
            <main className="h-full pb-16 overflow-y-auto" ref={componentRef}>
                <div className="container grid px-6 mx-auto">
                    {/* <!-- With actions --> */}
                    <div className="flex justify-between items-center">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            <span className="hidden print:inline-block capitalize">
                                {reportBy}
                            </span>{" "}
                            Sales Report
                        </h2>

                        <select
                            onChange={handleReportByChange}
                            defaultValue={reportBy}
                            className=" print:hidden text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                        >
                            <option value="all">All</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="w-full overflow-hidden rounded-lg shadow-xs">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Quantity</th>
                                        <th className="px-4 py-3">
                                            Unit Price
                                        </th>
                                        <th className="px-4 py-3">
                                            Total Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    {renderSales?.data?.length ? (
                                        renderSales?.data?.map((saleItem) => (
                                            <tr
                                                className="text-gray-700 dark:text-gray-400"
                                                key={saleItem.id}
                                            >
                                                <td className="px-4 py-3 text-sm">
                                                    {moment(
                                                        saleItem.attributes
                                                            .createdAt
                                                    ).format("ll")}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center text-sm">
                                                        <div>
                                                            <p className="font-semibold">
                                                                {
                                                                    saleItem
                                                                        .attributes
                                                                        ?.product
                                                                        ?.data
                                                                        ?.attributes
                                                                        ?.name
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {
                                                        saleItem.attributes
                                                            .quantity
                                                    }
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    ৳{" "}
                                                    {numeral(
                                                        saleItem.attributes
                                                            .product?.data
                                                            ?.attributes?.price
                                                    ).format("0,0")}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    ৳{" "}
                                                    {numeral(
                                                        saleItem.attributes
                                                            .quantity *
                                                            saleItem.attributes
                                                                .product?.data
                                                                ?.attributes
                                                                ?.price
                                                    ).format("0,0")}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="flex flex-col items-center justify-center p-10 text-gray-600 dark:text-gray-300 bg-indigo-800 bg-opacity-10 rounded-md m-2">
                                                    <h1>
                                                        No sale sales found{" "}
                                                    </h1>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr className="text-base font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-700">
                                        <td colSpan={4} className="px-4 py-3">
                                            Subtotal
                                        </td>
                                        <td className="px-4 py-3">
                                            ৳{" "}
                                            {numeral(totalSales).format("0,0")}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="flex justify-end mt-8">
                                {/* 
                                // @ts-ignore */}
                                <ReactToPrint
                                    trigger={() => (
                                        <Button className="print:hidden">
                                            Print report
                                        </Button>
                                    )}
                                    content={() => componentRef.current}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}
export default Report
