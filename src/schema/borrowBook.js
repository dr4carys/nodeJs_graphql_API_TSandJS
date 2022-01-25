import { query } from 'express';
import { Book, BookTC } from '../models/book';
import { borrowBook, borrowBookTC } from '../models/borrowBook';
import { User, UserTC } from '../models/user';
let date = new Date();
import { ApolloError } from 'apollo-server';
import { DataSync } from 'aws-sdk';
// borrowBookTC.addRelation('detialUser', {
//     resolver: () =>
//         UserTC.mongooseResolvers
//             .findOne({ lean: true })
//             .removeArg(['filter', 'skip', 'sort']),
//     prepareArgs: {
//         filter: (source) => ({ _id: source.idUser }),
//     },
//     projection: { idUser: 1 },
// });

borrowBookTC.addRelation('detailUser', {
    resolver: () => UserTC.mongooseResolvers.findOne({ lean: true }),
    prepareArgs: {
        _id: (source) => source.idUser,
    },
    projection: { idUser: 1 },
});

borrowBookTC.addRelation('detailBook', {
    resolver: () => BookTC.mongooseResolvers.dataLoaderMany({ lean: true }),
    prepareArgs: {
        _ids: (source) => source.idBook,
    },
    projection: { idBook: 1 },
});

export const pinjamBook = borrowBookTC.mongooseResolvers
    .createOne({ record: { removeFields: ['createdAt', 'updatedAt'] } })
    .wrapResolve((next) => async (rp) => {
        const {
            record: { idBook, Pax, endPinjam },
        } = rp.args;
        const data = await Book.findById(idBook);
        if (
            data.Pax < 1 ||
            new Date(endPinjam).getTime() < new Date().getTime()
        ) {
            throw new ApolloError(
                'error wether book in unvailable or wrong input date',
                '400'
            );
        } else {
            data.Pax = data.Pax - Pax;
        }
        rp.beforeRecordMutate = (record) => {
            record.startPinjam = new Date();
            record.status = false;
            return record;
        };
        const dataBook = await next(rp);
        const dataUpdate = await Book.findByIdAndUpdate(
            { _id: idBook },
            { $set: { Pax: data.Pax } }
        );

        console.log('>>dataUpdate', dataUpdate);
        return dataBook;
    });

export const returnBook = borrowBookTC.mongooseResolvers
    .updateById()
    .wrapResolve((next) => async (rp) => {
        const { _id: userRef } = rp.args;
        let dateNow = new Date();
        console.log('>>_id', userRef);
        const data = await borrowBook.findById(userRef);
        console.log(data);
        if (dateNow.getTime() > data.endPinjam.getTime())
            throw new ApolloError('peminjaman melebihi batas tanggal', '400');

        rp.beforeRecordMutate = (record) => {
            record.status = true;
        };
        rp.args.record={}
        return next(rp);
    })
    .removeArg(['record']);

// export const getAllBookById = borrowBookTC.mongooseResolvers.findMany().wrap
