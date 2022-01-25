import { query } from 'express';
import { Book, BookTC } from '../models/book';

export const buatBuku = BookTC.mongooseResolvers
    .createOne({ lean: true })
    .wrapResolve((next) => async (rp) => {
        const {
            record: { BookTitle },
        } = rp.args;
        const data = await Book.findOne({ BookTitle: BookTitle });
        if (!!data) throw new Error('buku udah ada');
        return next(rp);
    });
