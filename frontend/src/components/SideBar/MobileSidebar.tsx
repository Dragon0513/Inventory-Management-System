import { SideBarMenuItem, sideBarMenus } from "./SideBarHelper"

function MobileSidebar({
    isSideMenuOpen,
    setIsSideMenuOpen,
}: {
    isSideMenuOpen: boolean
    setIsSideMenuOpen: (isSideMenuOpen: boolean) => void
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
                            <a
                                className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                                href="#"
                            >
                                Windmill
                            </a>
                            <ul className="mt-6">
                                {sideBarMenus.map((item, index) => (
                                    <SideBarMenuItem item={item} key={index} />
                                ))}
                            </ul>
                            {/* CTA button */}
                            <div className="px-6 my-6">
                                <button className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                    Create account
                                    <span className="ml-2" aria-hidden="true">
                                        +
                                    </span>
                                </button>
                            </div>
                        </div>
                    </aside>
                </>
            )}
        </>
    )
}

export default MobileSidebar
