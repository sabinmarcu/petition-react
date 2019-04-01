import {
  observable,
  action,
  reaction,
} from 'mobx';

import AccountStore from './account';
import ContractStore from './contract';
import UserProfileStore from './user';

class PetitionStore {
  @observable account = AccountStore;

  @observable contract = ContractStore;

  @observable userProfile = UserProfileStore;

  @observable name = null;

  constructor() {
    reaction(() => this.contract.isOnline, async () => {
      if (this.contract.isOnline) {
        this.refreshPetition();
      }
    });
  }

  @action refreshPetition = async () => {
    this.name = await this.getPetitionName();
  }

  @action getPetitionName = async () => this.contract.executeCommand('getAddressedTo')
}

const Store = new PetitionStore();
if (process.env.NODE_ENV === 'development') {
  window.$s = Store;
}
export default Store;
