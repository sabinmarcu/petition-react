import React from 'react';
import { observer, useObservable } from 'mobx-react-lite';

import {
  Card,
  CardHeader,
} from '@material-ui/core';

import PetitionStore from '../mobx/petition';

const Petition = () => {
  const {
    signaturesCount,
    retractedCount,
  } = useObservable(PetitionStore);
  return (
    <>
      <Card>
        <CardHeader
          title="Petition"
          subheader={
            `Signatures: ${signaturesCount} / Retracted: ${retractedCount}`
          }
        />
      </Card>
    </>
  );
};

export default observer(Petition);
