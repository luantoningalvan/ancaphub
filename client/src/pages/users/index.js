import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import Paper from '../../components/ui/Paper';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import { getUsersRequest } from '../../actions/users';
import UserCard from '../../components/users/UserCard';
import LoadContent from '../../components/ui/LoadContent';

export default () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersRequest());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Hero title={<FormattedMessage id="common.users" />} />
      <div style={{ marginTop: 16 }}>
        <LoadContent loading={loading}>
          {!isEmpty(items) ? (
            <GridContainer spacing={2}>
              {items.map((user) => (
                <GridItem xs={3}>
                  <UserCard user={user.user} />
                </GridItem>
              ))}
            </GridContainer>
          ) : (
            <Paper padding>
              <FormattedMessage id="common.noUsersFound" />
            </Paper>
          )}
        </LoadContent>
      </div>
    </Container>
  );
};
