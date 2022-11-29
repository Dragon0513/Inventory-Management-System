import React from "react"
import { useThemeProvider } from "~/context/ThemeContext"
import { classNames } from "~/utils"
import Header from "./Header"
import DesktopSidebar from "./SideBar/DesktopSidebar"
import MobileSidebar from "./SideBar/MobileSidebar"

function Layout({ children }: { children: React.ReactNode }) {
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
                {children}
            </div>
        </div>
    )
}

export default Layout
