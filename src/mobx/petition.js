import {
  observable,
  action,
  reaction,
  computed,
} from 'mobx';

import AccountStore from './account';
import ContractStore from './contract';
import UserProfileStore from './user';

const signerDecoder = ([
  address,
  id,
  name,
  lastname,
  retractedSignature,
]) => ({
  address,
  name,
  lastname,
  id: id.toNumber(),
  retractedSignature: retractedSignature.toNumber(),
});

class PetitionStore {
  @observable account = AccountStore;

  @observable contract = ContractStore;

  @observable userProfile = UserProfileStore;

  @observable name = null;

  @observable signaturesCount: -1;

  @observable retractedCount: -1;

  @observable signatures = [];

  @computed get isOnline() {
    return this.contract.isOnline && this.account.isOnline;
  }

  constructor() {
    reaction(() => this.contract.isOnline, async () => {
      if (this.contract.isOnline) {
        await this.refreshPetition();
        await this.refreshSignatures();
      }
    });
  }

  @action refreshPetition = async () => {
    this.name = await this.getPetitionName();
  }

  @action refreshSignaturesCount = async () => {
    this.signaturesCount = (await this.getSignatureCount()).toNumber();
    this.retractedCount = (await this.getRetractedCount()).toNumber();
  }

  @action refreshSignatures = async () => {
    await this.refreshSignaturesCount();
    this.signatures = (await Promise.all(
      (new Array(this.signaturesCount))
        .fill(0)
        .map(async (_, index) => this.getSigner(
          await this.getSignatureIndexByIdentificationId(index),
        )),
    )).map(signerDecoder);
  }

  @action getPetitionName = async () => this.contract.executeCommand('getAddressedTo')

  @action getSignatureCount = async () => this.contract.executeCommand('getSignaturesNumber')

  @action getRetractedCount = async () => this.contract.executeCommand('getRetractedSignaturesIndex')

  @action getSigner = async signer => this.contract.executeCommand('getSigner', signer)

  @action getSignatureIndexByIdentificationId = async id => this.contract.executeCommand('getSignatureIndexByIdentificationId', id)
}

const Store = new PetitionStore();
if (process.env.NODE_ENV === 'development') {
  window.$s = Store;
}
export default Store;
