import type { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import Layout from "~/components/Layout"
import { requireUserId } from "~/utils/session.server"

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function Sales() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}
export default Sales
