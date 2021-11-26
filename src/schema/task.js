import { query } from 'express';
import { TaskTC } from '../models/task';
import { User, UserTC } from '../models/user';

export const CreateTaskData = TaskTC.mongooseResolvers.createOne({
    lean: true,
});

UserTC.addResolver({
    name: 'ambildata',
    type: [UserTC],
    resolve: async (rp) => {
        console.log(rp);
        const data = await User.find({ name: rp.name });
        console.log('this is data >>>>', data);
        return data;
    },
});

TaskTC.addRelation('data_user', {
    resolver: () => UserTC.getResolver('ambildata'),
    prepareArgs: {
        user: (source) => ({ user: source.user }),
    },
    projection: { name: 1, email: 1 },
});

export const ambilData = TaskTC.mongooseResolvers.findOne({ lean: true });
// const TaskQuery = {
//     taskById: TaskTC.getResolver('findById'),
//     taskByIds: TaskTC.getResolver('findByIds'),
//     taskOne: TaskTC.getResolver('findOne'),
//     taskMany: TaskTC.getResolver('findMany'),
//     taskCount: TaskTC.getResolver('count'),
//     taskConnection: TaskTC.getResolver('connection'),
//     taskPagination: TaskTC.getResolver('pagination'),
// };

// const TaskMutation = {
//     taskCreateOne: TaskTC.getResolver('createOne'),
//     taskCreateMany: TaskTC.getResolver('createMany'),
//     taskUpdateById: TaskTC.getResolver('updateById'),
//     taskUpdateOne: TaskTC.getResolver('updateOne'),
//     taskUpdateMany: TaskTC.getResolver('updateMany'),
//     taskRemoveById: TaskTC.getResolver('removeById'),
//     taskRemoveOne: TaskTC.getResolver('removeOne'),
//     taskRemoveMany: TaskTC.getResolver('removeMany'),
// };

// export { TaskQuery, TaskMutation };
