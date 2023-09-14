import { Response } from 'express';

 export const setHeaders = (res:  Response) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin,' +
        ' Content-Type, Access-Control-Allow-Methods, Access-Control-Request-Headers,' +
        ' Access-Control-Allow-Headers, Accept'
    });
}