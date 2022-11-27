import { SideBarMenuItem, sideBarMenus } from "./SideBarHelper"

function DesktopSidebar() {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
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
                    <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                        Create account
                        <span className="ml-2" aria-hidden="true">
                            +
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default DesktopSidebar
