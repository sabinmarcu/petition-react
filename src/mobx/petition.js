import {
  observable,
  action,
  reaction,
  computed,
} from 'mobx';

import AccountStore from './account';
import ContractStore from './contract';
import UserProfileStore from './user';

class PetitionStore {
  @observable account = AccountStore;

  @observable contract = ContractStore;

  @observable userProfile = UserProfileStore;

  @observable name = null;

  @observable signaturesCount: -1;

  @observable retractedCount: -1;

  @computed get isOnline() {
    return this.contract.isOnline && this.account.isOnline;
  }

  constructor() {
    reaction(() => this.contract.isOnline, async () => {
      if (this.contract.isOnline) {
        await this.refreshPetition();
        await this.refreshSignaturesCount();
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

  @action getPetitionName = async () => this.contract.executeCommand('getAddressedTo')

  @action getSignatureCount = async () => this.contract.executeCommand('getSignaturesNumber')

  @action getRetractedCount = async () => this.contract.executeCommand('getRetractedSignaturesIndex')
}

const Store = new PetitionStore();
if (process.env.NODE_ENV === 'development') {
  window.$s = Store;
}
export default Store;
