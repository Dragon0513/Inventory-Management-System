import type { RenderOptions } from "@testing-library/react"
import type { ReactElement } from "react"
import type { User } from "~/types"
import { render } from "@testing-library/react"
import AuthProvider from "~/context/AuthProvider"
import { MemoryRouter } from "react-router-dom"

export const dummyUser: User = {
    id: 3,
    username: "Md Maruf Ahmed",
    email: "maruf@gmail.com",
    confirmed: true,
    blocked: false,
    avatar: {
        id: 4,
        name: "IMG_20220801_035813 (Large).jpg",
        width: 1080,
        height: 1282,
        formats: {
            thumbnail: {
                name: "thumbnail_IMG_20220801_035813 (Large).jpg",
                hash: "thumbnail_IMG_20220801_035813_Large_644e000333",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 132,
                height: 156,
                size: 6.53,
                url: "/uploads/thumbnail_IMG_20220801_035813_Large_644e000333.jpg",
            },
            small: {
                name: "small_IMG_20220801_035813 (Large).jpg",
                hash: "small_IMG_20220801_035813_Large_644e000333",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 421,
                height: 500,
                size: 45.99,
                url: "/uploads/small_IMG_20220801_035813_Large_644e000333.jpg",
            },
        },
        hash: "IMG_20220801_035813_Large_644e000333",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 227.74,
        url: "/uploads/IMG_20220801_035813_Large_644e000333.jpg",
        previewUrl: null,
    },
    role: {
        id: 3,
        name: "Admin",
        description: "This role is for the admin who can access everything",
        type: "admin",
    },
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <MemoryRouter initialEntries={["/login"]}>
            <AuthProvider user={dummyUser}>{children}</AuthProvider>
        </MemoryRouter>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
