import { Disclosure } from "@headlessui/react"
import { NavLink } from "react-router-dom"
import { classNames } from "../../utils"

export interface sideBarMenuChildType {
    name: string
    url: string
}

export interface sideBarMenuType {
    name: string
    url: string
    icon: React.ReactNode
    children?: Array<sideBarMenuChildType>
}
export const sideBarMenus = [
    {
        name: "Dashboard",
        url: "/",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
        ),
    },
    {
        name: "Forms",
        url: "/forms",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
        ),
    },
    {
        name: "Cards",
        url: "/cards",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
        ),
    },
    {
        name: "Charts",
        url: "/charts",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
            </svg>
        ),
    },
    {
        name: "Buttons",
        url: "/buttons",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
            </svg>
        ),
    },
    {
        name: "Modals",
        url: "/modals",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
        ),
    },
    {
        name: "Tables",
        url: "/tables",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
        ),
    },
    {
        name: "Pages",
        url: "/pages",
        icon: (
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
            </svg>
        ),
        children: [
            {
                name: "Login",
                url: "/login",
            },
            {
                name: "Create Account",
                url: "/create-account",
            },
            {
                name: "Forgot Password",
                url: "/forgot-password",
            },
            {
                name: "404",
                url: "/404",
            },
            {
                name: "Blank",
                url: "/blank",
            },
        ],
    },
]

// Side bar menu item
export function SideBarMenuItem({ item }: { item: sideBarMenuType }) {
    return (
        <li className="relative px-6 py-3">
            {item.children ? (
                <>
                    <Disclosure>
                        <Disclosure.Button className="w-full">
                            <button
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                aria-haspopup="true"
                            >
                                <span className="inline-flex items-center">
                                    {item.icon}
                                </span>
                                <span className="ml-4">{item.name}</span>
                                <svg
                                    className="w-4 h-4 ml-auto"
                                    aria-hidden="true"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </Disclosure.Button>
                        <Disclosure.Panel>
                            <ul
                                className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                                aria-label="submenu"
                            >
                                {item.children.map((child, i) => (
                                    <li
                                        key={i}
                                        className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <NavLink
                                            className="w-full"
                                            to={child.url}
                                        >
                                            {child.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </Disclosure.Panel>
                    </Disclosure>
                </>
            ) : (
                <NavLink
                    className={({ isActive }) =>
                        classNames(
                            "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ",
                            isActive ? "text-gray-800 dark:text-gray-100" : null
                        )
                    }
                    to={item.url}
                    end
                >
                    {({ isActive }) => (
                        <>
                            {isActive ? (
                                <span
                                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                    aria-hidden="true"
                                ></span>
                            ) : null}
                            {item.icon}
                            <span className="ml-4">{item.name}</span>
                        </>
                    )}
                </NavLink>
            )}
        </li>
    )
}
