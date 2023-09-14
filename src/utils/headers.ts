import { Response } from 'express';

const __ALLOWED_ORIGINS__: string[] = [
    'https://rasp.cullfy.ru',
    'https://dev.cullfy.ru',
]

 export const setHeaders = (res:  Response) => {
    res.set({
        'Access-Control-Allow-Origin': __ALLOWED_ORIGINS__.join(', '),
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,' +
        ' Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Headers,' +
        ' Access-Control-Allow-Headers, Accept'
    });
}