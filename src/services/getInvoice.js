import { invoice } from "../data/invoice";

export const getInvoice = () => {
    // Calcular Total
    // let total = 0;
    // invoice.items.forEach( item => {
    //     total += item.price * item.quantity;
    // });

    const total = invoice.items
        .map(item => item.price * item.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return {...invoice, total};
}