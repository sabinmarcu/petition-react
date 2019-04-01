import React from 'react';
import { observer, useObservable } from 'mobx-react-lite';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@material-ui/core';

import PetitionStore from '../mobx/petition';
import style from './Petition.module.css';

const Petition = () => {
  const {
    signaturesCount,
    retractedCount,
    signatures,
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
        {' '}
        <CardContent>
          {signatures.length > 0
            ? (
              <>
                <Typography variant="h6">Signatures:</Typography>
                <section className={style.tableWrapper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Retracted</TableCell>
                        <TableCell>Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {signatures.map(({
                        id,
                        address,
                        name,
                        lastname,
                        retractedSignature,
                      }) => (
                        <TableRow key={id}>
                          <TableCell>{name}</TableCell>
                          <TableCell>{lastname}</TableCell>
                          <TableCell>
                            {retractedSignature ? 'Retracted' : 'Signed'}
                          </TableCell>
                          <TableCell>{address}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </section>
              </>
            )
            : <Typography variant="h6">There are no signatures yet!</Typography>
          }
        </CardContent>
      </Card>
    </>
  );
};

export default observer(Petition);
