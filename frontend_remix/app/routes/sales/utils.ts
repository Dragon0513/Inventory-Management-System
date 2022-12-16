import { json } from "@remix-run/node"

export type ActionData = {
    formError?: string
    fieldErrors?: {
        name: string | undefined
        price: string | undefined
        quantity: string | undefined
    }
    fields?: {
        name: string
        description: string
        price: string
        quantity: string
        categories: Array<FormDataEntryValue>
        store: string
    }
}

export function validateName(name: unknown) {
    if (typeof name !== "string" || name.length < 4) {
        return `Product name is too short`
    }
}

export function validatePrice(price: unknown) {
    if (typeof price !== "string" || price.length < 1) {
        return "Price is required"
    } else {
        if (parseInt(price) <= 0) {
            return `Price can't be negative`
        }
    }
}
export function validateQuantity(quantity: unknown) {
    if (typeof quantity !== "string" || quantity.length < 1) {
        return "quantity is required"
    } else {
        if (parseInt(quantity) <= 0) {
            return `quantity can't be negative`
        }
    }
}

export const badRequest = (data: ActionData) => json(data, { status: 400 })
