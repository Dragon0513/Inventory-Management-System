import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import Header from "~/components/Header"
import DesktopSidebar from "~/components/SideBar/DesktopSidebar"
import MobileSidebar from "~/components/SideBar/MobileSidebar"
import { useThemeProvider } from "~/context/ThemeContext"
import { classNames } from "~/utils"
import { requireUserId } from "~/utils/session.server"

export const meta: MetaFunction = () => ({
    title: "Dashboard",
})

export const loader: LoaderFunction = async ({ request }) => {
    return await requireUserId(request)
}

function Index() {
    const { isDarkMode, isSideMenuOpen, setIsSideMenuOpen, toggleDarkMode } =
        useThemeProvider()
    return (
        <div
            className={classNames(
                "flex h-screen bg-gray-50 dark:bg-gray-900",
                isSideMenuOpen ? "overflow-hidden" : null
            )}
        >
            <DesktopSidebar />
            <MobileSidebar
                isSideMenuOpen={isSideMenuOpen}
                setIsSideMenuOpen={setIsSideMenuOpen}
            />
            <div className="flex flex-col flex-1 w-full">
                <Header
                    isDarkMode={isDarkMode}
                    isSideMenuOpen={isSideMenuOpen}
                    setIsSideMenuOpen={setIsSideMenuOpen}
                    toggleDarkMode={toggleDarkMode}
                />
                <Outlet />
            </div>
        </div>
    )
}

export default Index
