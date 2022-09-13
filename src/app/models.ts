export interface Item {
    item: string,
    quantity: number
}

export interface Order {
    orderId?: string,
    name: string,
    email: string,
    items: Item[]
}

export type OrderDB = {
    [key: string]: Order
}