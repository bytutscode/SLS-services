import { PubInstance } from "../models/Pub";

export const getWhatsapp = (service: PubInstance) => {
    let numberWithMask = service.phone.split('');
    let whatsapp = '';
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    numberWithMask.forEach(digito => {
        if (numbers.includes(digito)) {
            whatsapp += digito;
        }
    })
    service.whatsapp = whatsapp;
}