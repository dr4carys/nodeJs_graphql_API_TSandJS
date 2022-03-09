import { Nilai, NilaiTC } from '../models/nilai';
import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
import { schemaComposer } from 'graphql-compose';
import _ from 'lodash';
import { ApolloError } from 'apollo-server-express';

export const inputNilai = NilaiTC.mongooseResolvers.createOne();

const detailPembimbingTC = schemaComposer.createObjectTC(`
  type detailPembimbing{
    NIK: String,
    name: String,
    nilai : String
  }
`);

export const summaryNilaiTC = schemaComposer.createObjectTC({
  name: 'summarNilaiResult',
  fields: {
    nama: 'String',
    detailPembimbing: { type: [detailPembimbingTC] },
    avg: 'String',
  },
});

summaryNilaiTC.addResolver({
  name: 'nilaiConnection',
  type: [summaryNilaiTC],
  kind: 'query',
  args: { NIM: 'String', NIK: 'String' },
  resolve: async (rp: ResolverResolveParams<any, any>) => {
    const { NIM, NIK } = rp.args;
    let payload: any = {};
    if (NIM || NIK) {
      payload = NIM ? { idMahasiswa: new RegExp(NIM, 'i') } : { idPembimbing: new RegExp(NIK, 'i') };
    }
    const result = await Nilai.find(payload).populate({ path: 'idPembimbing', select: '_id name' });
    const grouped1 = _.groupBy(result, (dm: any) => dm.idMahasiswa);
    const outputList = Object.keys(grouped1).map((groupKey) => {
      const groupItems = grouped1[groupKey];
      console.log('groupItems >>', groupItems);
      const payload = {
        nama: groupKey,
        detailPembimbing: groupItems.map((item: any) => ({
          NIK: item.idPembimbing._id,
          name: item.idPembimbing.name,
          nilai: item.nilai,
        })),
        avg: _.meanBy(groupItems, (item: any) => item.nilai),
      };
      return payload;
    });
    return outputList;
  },
});

export const allNilai = summaryNilaiTC.getResolver('nilaiConnection');

export const isiNilai = NilaiTC.mongooseResolvers
  .findOne()
  .wrapResolve((next) => async (rp: ResolverResolveParams<any, any>) => {
    const result = await next(rp);
    if (result) throw new ApolloError('already.voted', '400');
    return await Nilai.create(rp.args.filter);
  });

export const nilaiConnection = NilaiTC.mongooseResolvers.connection();

//
// import { Nilai, NilaiTC } from '../models/nilai';
// import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
// import { schemaComposer } from 'graphql-compose';
// import _ from 'lodash';
// import { ApolloError } from 'apollo-server-express';

// export const inputNilai = NilaiTC.mongooseResolvers.createOne();

// const detailPembimbingTC = schemaComposer.createObjectTC(`
//   type detailPembimbing{
//     _id: String,
//     name: String,
//     nilai : String
//   }
// `);

// export const summaryNilaiTC = schemaComposer.createObjectTC({
//   name: 'summarNilaiResult',
//   fields: {
//     nama: 'String',
//     detailPenguji: { type: [detailPembimbingTC] },
//     avg: 'String',
//   },
// });

// summaryNilaiTC.addResolver({
//   name: 'nilaiConnection',
//   type: [summaryNilaiTC],
//   kind: 'query',
//   args: { NIM: 'String', NIK: 'String' },
//   resolve: async (rp: ResolverResolveParams<any, any>) => {
//     const { NIM, NIK } = rp.args;
//     let payload: any = {};
//     if (NIM || NIK) {
//       payload = NIM ? { idMahasiswa: new RegExp(NIM, 'i') } : { idPembimbing: new RegExp(NIK, 'i') };
//     }
//     const result = await Nilai.find(payload).populate({ path: 'idPembimbing', select: '_id name' });
//     const grouped1 = _.groupBy(result, (dm: any) => dm.idMahasiswa);
//     const outputList = Object.keys(grouped1).map((groupKey) => {
//       let i = 0;
//       const groupItems = grouped1[groupKey];

//       console.log("grrrrrrrrrrrr", groupItems)
//       const payload = {
//         nama: groupKey,

//         NIK: groupItems[i].idPembimbing._id,
//         namaPembimbing: groupItems[i].idPembimbing.name,
//         nilai: groupItems[i].nilai,
//         avg: _.meanBy(groupItems, (item: any) => item.nilai),
//       };
//       i++;
//       return payload;
//     });
//     console.log('outputList >>', outputList);
//     return outputList;
//   },
// });

// // {
// //   [Node]     _id: new ObjectId("6225a48915159ea0393707e5"),
// //   [Node]     idMahasiswa: 'bram1',
// //   [Node]     idPembimbing: { _id: '124', name: 'pak narendra' },
// //   [Node]     nilai: 80,
// //   [Node]     createdAt: 2022-03-07T06:22:01.354Z,
// //   [Node]     updatedAt: 2022-03-07T06:22:01.354Z,
// //   [Node]     __v: 0
// //   [Node]   },

// export const allNilai = summaryNilaiTC.getResolver('nilaiConnection');

// export const isiNilai = NilaiTC.mongooseResolvers
//   .findOne()
//   .wrapResolve((next) => async (rp: ResolverResolveParams<any, any>) => {
//     const result = await next(rp);
//     if (result) throw new ApolloError('already.voted', '400');
//     return await Nilai.create(rp.args.filter);
//   });

// export const nilaiConnection = NilaiTC.mongooseResolvers.connection();
