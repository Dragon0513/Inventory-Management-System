import { Link } from "@remix-run/react"
import { SideBarMenuItem, sideBarMenus } from "./SideBarHelper"

function MobileSidebar({
    isSideMenuOpen,
    setIsSideMenuOpen,
}: {
    isSideMenuOpen: Boolean
    setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            {isSideMenuOpen && (
                <>
                    <div
                        onClick={() => setIsSideMenuOpen(false)}
                        className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
                    ></div>

                    <aside
                        className=" fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setIsSideMenuOpen(false)
                        }}
                    >
                        <div className="py-4 text-gray-500 dark:text-gray-400">
                            <Link
                                className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                                to="/"
                            >
                                Windmill
                            </Link>
                            <ul className="mt-6">
                                {sideBarMenus.map((item, index) => (
                                    <SideBarMenuItem item={item} key={index} />
                                ))}
                            </ul>
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}

export default MobileSidebar
