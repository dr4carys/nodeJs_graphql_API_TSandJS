import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import {
    userCreateOne,
    findManyUser,
    findUser,
    UpdateUser,
    createWeb,
    ambilDataWeb,
    signup,
    logIn,
} from './user';
import { buat_web } from './web';
import { CreateTaskData, ambilData } from './task';

schemaComposer.Query.addFields({
    ambilDataWeb,
    ambilData,
    findUser,
    findManyUser,
});

schemaComposer.Mutation.addFields({
    logIn,
    signup,
    buat_web,
    CreateTaskData,
    userCreateOne,
    UpdateUser,
    createWeb,
});

export default schemaComposer.buildSchema();
