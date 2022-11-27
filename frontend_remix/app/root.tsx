import type { MetaFunction, LinksFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react"

import styles from "./styles/app.css"
import Layout from "./components/Layout"

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }]
}
export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
})

export default function App() {
    return (
        <Document>
            {/* <Layout> */}
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
            {/* </Layout> */}
        </Document>
    )
}
function Document({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>{children}</body>
        </html>
    )
}
