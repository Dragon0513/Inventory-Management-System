import React from "react"
import { useThemeProvider } from "~/context/ThemeContext"
import { useTopProgressBarProvider } from "~/context/TopProgressBarProvider"
import { classNames } from "~/utils"
import Header from "./Header"
import DesktopSidebar from "./SideBar/DesktopSidebar"
import MobileSidebar from "./SideBar/MobileSidebar"
import LoadingBar from "react-top-loading-bar"

function Layout({ children }: { children: React.ReactNode }) {
    const { isDarkMode, isSideMenuOpen, setIsSideMenuOpen, toggleDarkMode } =
        useThemeProvider()
    // top progress bar
    const { progress, setProgress } = useTopProgressBarProvider()
    React.useEffect(() => {
        setProgress(100)
    }, [setProgress])
    return (
        <>
            <LoadingBar color="#7e3af2" progress={progress} />
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
        </>
    )
}

export default Layout
