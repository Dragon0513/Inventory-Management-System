import { render, screen } from "../test-utils"
import type { LoaderData } from "~/routes/dashboard/index"
import Dashboard, { cardsData } from "~/routes/dashboard/index"

const data: LoaderData = {
    "Sales Revenue": "৳ 2,000",
    "Products Value": "৳ 1,000",
    "Total Products": "7",
    "Total Categories": "6",
}

// Mocking remix-run/react module
vi.mock("@remix-run/react", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await vi.importActual<typeof import("@remix-run/react")>(
        "@remix-run/react"
    )
    const useLoaderData = vi.fn().mockImplementation(() => data)
    return { ...actual, useLoaderData }
})

test("Dashboard is rendering with data", async () => {
    const labelTexts = cardsData.reduce(
        (acumulator, value) => ({ ...acumulator, [value.title]: value.title }),
        {}
    ) as Record<keyof LoaderData, string>
    render(<Dashboard />)
    // screen.debug()

    const salesRevenueElement = screen.getByRole("generic", {
        name: labelTexts["Sales Revenue"],
    })
    const productValueElement = screen.getByRole("generic", {
        name: labelTexts["Products Value"],
    })
    const totalProductElement = screen.getByRole("generic", {
        name: labelTexts["Total Products"],
    })
    const totalCategoriesElement = screen.getByRole("generic", {
        name: labelTexts["Total Categories"],
    })
    // Check all cards are rendered with currect data
    expect(salesRevenueElement).toHaveTextContent(data["Sales Revenue"])
    expect(productValueElement).toHaveTextContent(data["Products Value"])
    expect(totalProductElement).toHaveTextContent(data["Total Products"])
    expect(totalCategoriesElement).toHaveTextContent(data["Total Categories"])
})
