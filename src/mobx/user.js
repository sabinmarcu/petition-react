import { observable, computed } from 'mobx';

class UserProfileStore {
  @observable name = '';

  @observable lastname = '';

  @computed get fullname() {
    return `${this.name} ${this.lastname}`;
  }
}

export default new UserProfileStore();
