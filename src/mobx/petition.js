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

  @observable identificationId = null;

  @computed get isOnline() {
    return this.contract.isOnline && this.account.isOnline;
  }

  @computed get hasSigned() {
    return this.identificationId != null;
  }

  constructor() {
    reaction(() => this.contract.isOnline, async () => {
      if (this.contract.isOnline) {
        await this.refreshPetition();
        await this.refreshSignatures();
        this.subscribeToPetitionSign(this.reactToSignatureChange);
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
    await this.tryAndGetIdentificationId();
  }

  @action signPetition = async () => {
    if (this.identificationId) {
      throw new Error('You have already signed this petition!');
    }
    const signatureCount = await this.getSignatureCount();
    return this.addSignerAndSign(
      signatureCount,
      this.userProfile.name,
      this.userProfile.lastname,
    );
  }

  @action tryAndGetIdentificationId = async () => {
    if (this.signatures.length > 0) {
      const signer = this.signatures.find(
        ({ address }) => address === this.account.primaryAccount,
      );
      if (signer) {
        this.identificationId = signer.id;
        this.userProfile.name = signer.name;
        this.userProfile.lastname = signer.lastname;
      } else {
        this.identificationId = null;
        this.userProfile.name = null;
        this.userProfile.lastname = null;
      }
    }
  }

  @action retractSignature = async () => {
    if (!this.identificationId) {
      throw new Error('You must have signed the petition to retract it!');
    }
    return this.retractSign();
  }

  @action getPetitionName = async () => this.contract.executeCommand('getAddressedTo')

  @action getSignatureCount = async () => this.contract.executeCommand('getSignaturesNumber')

  @action getRetractedCount = async () => this.contract.executeCommand('getRetractedSignaturesIndex')

  @action getSigner = async signer => this.contract.executeCommand('getSigner', signer)

  @action getSignatureIndexByIdentificationId = async id => this.contract.executeCommand('getSignatureIndexByIdentificationId', id)

  @action addSignerAndSign = async (id, name, lastname) => this.contract.executeCommand('addSignerAndSign', id, name, lastname)

  @action subscribeToPetitionSign = (
    successHandler,
    errorHandler,
  ) => this.contract.subscribeToEvent(
    'PetitionSigned',
    successHandler,
    errorHandler,
  )
}

const Store = new PetitionStore();
if (process.env.NODE_ENV === 'development') {
  window.$s = Store;
}
export default Store;
