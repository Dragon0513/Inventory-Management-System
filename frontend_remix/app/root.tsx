import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from "@remix-run/react"
import React from "react"
import ThemeProvider from "./context/ThemeContext"
import styles from "./styles/app.css"

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
})

export default function App() {
    return (
        <Document>
            <ThemeProvider>
                <Outlet />
            </ThemeProvider>
        </Document>
    )
}

function Document({
    children,
    title = `Remix: So great, it's funny!`,
}: {
    children: React.ReactNode
    title?: string
}) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <title>{title}</title>
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export function CatchBoundary() {
    const caught = useCatch()

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <div className="error-container">
                <h1>
                    {caught.status} {caught.statusText}
                </h1>
            </div>
        </Document>
    )
}

// 60
export function ErrorBoundary({ error }: { error: Error }) {
    return (
        <Document title="Uh-oh!">
            <div className="error-container">
                <h1>App Error</h1>
                <pre>{error.message}</pre>
            </div>
        </Document>
    )
}
