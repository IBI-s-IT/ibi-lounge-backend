import { Response } from 'express';

const __ALLOWED_ORIGINS__: string[] = [
    'https://rasp.cullfy.ru',
    'http://dev.cullfy.ru',
    'http://45.12.72.131'
]

const validateOrigin = (origin: string): string => {
    return __ALLOWED_ORIGINS__.includes(origin) ? '*' : '';
}

 export const setHeaders = (res:  Response) => {
    res.set({
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,' +
        ' Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Headers,' +
        ' Access-Control-Allow-Headers, Accept'
    });
    res.setHeader('Access-Control-Allow-Origin', validateOrigin(res.get('origin') || ''));
}