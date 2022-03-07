import { ResolverResolveParams } from 'graphql-compose/lib/Resolver';
import { PembimbingTC } from '../models/pembimbing';

export const buatPembimbing = PembimbingTC.mongooseResolvers
  .createOne()
  .removeArg('record')
  .wrapResolve((next) => async (rp: ResolverResolveParams<any, any>) => {
    const payload = rp.args;
    rp.args.record = payload;
    return next(rp);
  })
  .addArgs({ _id: 'String!', name: 'String' });
