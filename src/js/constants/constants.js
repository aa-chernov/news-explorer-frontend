import { dater } from '../utils/dater';

export const DATE_FROM = dater(new Date(Date.now() - 7 * 24 * 60 * 60000));
export const DATE_TO = dater(new Date());
export const PAGE_SIZE = 100;

export const cardLimit = 3;
