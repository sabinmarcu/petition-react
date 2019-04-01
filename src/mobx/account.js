import { observable, computed, action } from 'mobx';
import ethereum from '../shims/ethereum';

class ConnectionStore {
  @observable accounts = [];

  @computed get primaryAccount() { return this.accounts[0]; }

  @computed get isOnline() { return this.accounts.length > 0; }

  constructor() {
    this.getAccounts().then((accounts) => {
      this.accounts = accounts;
    });
  }

  @action getAccounts = async () => (await ethereum.enable()).sort()
}

export default new ConnectionStore();
