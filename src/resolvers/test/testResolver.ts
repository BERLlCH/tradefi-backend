import { Query, Resolver } from 'type-graphql';
import AgreementSignProofModel from '../../../daosign/src/models/agreementSignProof';

@Resolver(AgreementSignProofModel)
export default class TestResolver {
  @Query(() => Boolean)
  getTrue() {
    return true;
  }
}
