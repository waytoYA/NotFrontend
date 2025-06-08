import { BasketItem } from "@/store/slices/basketSlice";

class Utilities {

    toFormatDate (timestamp: number) {
        const date = new Date(timestamp * 1000);

        const day = date.getDate();
        const month = date.toLocaleString('en', { month: 'short' });
        const year = `'${String(date.getFullYear()).slice(2)}`;

        return `${day} ${month} ${year}`
    }

    sumBasket (basket: BasketItem[]) {
        return basket.reduce((sum: number, item: BasketItem) => sum + (item.price * item.quantity), 0)
    }

}

export const Utils = new Utilities();