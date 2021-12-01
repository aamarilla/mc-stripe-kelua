/**
 * @description Convierte el monto en guaranies a dolares estadounidenses
 * @param {number} guaraniAmount Monto en guaranies
 * @return {number}
 */
export const PYGToUSD = (guaraniAmount: number): number => {
    return Number((guaraniAmount / 6800).toFixed(2));
};

/**
 * @description Convierte los dolares en centavos de dolar
 * @param amount Monto en DOLARES que se va a convertir
 * @return {number}
 */
export const convertToCents = (amount: number): number => {
    return Number((amount * 100).toFixed(0));
};
