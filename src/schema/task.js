import { query } from 'express';
import { TaskTC } from '../models/task';
import { User, UserTC } from '../models/user';

export const CreateTaskData = TaskTC.mongooseResolvers.createOne({
    lean: true,
});

// UserTC.addResolver({
//     name: 'ambildata',
//     type: [UserTC],
//     resolve: async (rp) => {
//         console.log(rp);
//         const data = await User.find({ name: rp.name });
//         console.log('this is data >>>>', data);
//         return data;
//     },
// });

TaskTC.addRelation('data_user', {
    resolver: () =>
        UserTC.mongooseResolvers
            .findOne({ lean: true })
            .removeArg(['filter', 'skip', 'sort']),
    prepareArgs: {
        _id: (source) => ({ _id: source._id }),
    },
    projection: { name: 1, email: 1 },
});

export const ambilData = TaskTC.mongooseResolvers.findOne({ lean: true });

export const createTask = TaskTC.mongooseResolvers
    .createOne()
    .wrapResolve((next) => async (rp) => {
        console.log(rp);
        const data = await User.find({ id: rp.args.user });
        if (!data) throw new Error('cannot find userName');
        return next(rp);
    });

export const editTaskByUser = TaskTC.mongooseResolvers.updateById({
    record: { removeFields: ['user', 'createdAt', 'updatedAt', '_id'] },
});

export const findTaskByUser = TaskTC.mongooseResolvers
    .findMany({
        filter: {
            requiredFields: ['user'],
            removeFields: [
                '_id',
                'task',
                'description',
                'createdAt',
                'updatedAt',
                'OR',
                'AND',
            ],
        },
    })
    .removeArg(['skip', 'limit', 'sort']);

export const detailTask = TaskTC.mongooseResolvers.findById();
