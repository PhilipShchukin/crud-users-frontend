import axios from "axios";
import {  getContentType } from './api.helper';

const axiosOptions = {
    baseURL: 'http://localhost:4200/api',
    headers: getContentType(),
}
 export const axiosClassic = axios.create(axiosOptions)

