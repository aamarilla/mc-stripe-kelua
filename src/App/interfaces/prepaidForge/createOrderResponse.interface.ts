export interface ICreateOrderResponse {
    orderReference: string;
    customOrderReference: string;
    code: null | string;
    serial: string;
    image: {
        filename: string;
        filetype: string;
        downloadLink: string;
    };
    codeType: string;
}
