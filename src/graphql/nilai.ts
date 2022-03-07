import { Nilai, NilaiTC } from '../models/nilai';
import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
import { schemaComposer } from 'graphql-compose';
import _ from 'lodash';
import { ApolloError } from 'apollo-server-express';

export const inputNilai = NilaiTC.mongooseResolvers.createOne();

const detailPembimbingTC = schemaComposer.createObjectTC(`
  type detailPembimbing{
    _id: String,
    name: String,
    nilai : String
  }
`);

export const summaryNilaiTC = schemaComposer.createObjectTC({
  name: 'summarNilaiResult',
  fields: {
    nama: 'String',
    detailPenguji: { type: [detailPembimbingTC] },
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
      return {
        nama: groupKey,
        detailPenguji: _.map(groupItems, (item: any) => ({
          id: item.idPembimbing._id,
          name: item.idPembimbing.name,
          nilai: item.nilai,
        })),
        avg: _.meanBy(groupItems, (item: any) => item.nilai),
      };
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
