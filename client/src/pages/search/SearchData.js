import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Container from '../../components/ui/Container';
import { searchTermRequest as searchTerm } from '../../actions/search';
import UserCard from '../../components/users/UserCard';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Card from '../../components/ui/Card';
import CardHeader from '../../components/ui/CardHeader';
import Menu from '../../components/ui/Menu';
import MenuItem from '../../components/ui/MenuItem';
import Loader from '../../components/ui/Loader';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const term = useQuery().get('s');
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchTerm !== '') {
      dispatch(searchTerm(term));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, searchTerm]);

  return (
    <Container style={{ marginTop: 16 }}>
      {!loading ? (
        <GridContainer spacing={2}>
          <GridItem xs={3}>
            <Card style={{ width: '100%' }}>
              <CardHeader>
                <h3>
                  <FormattedMessage id="search.filter" />
                </h3>
              </CardHeader>
              <Menu>
                <MenuItem label={<FormattedMessage id="common.all" />} />
                <MenuItem label={<FormattedMessage id="common.library" />} />
                <MenuItem label={<FormattedMessage id="common.users" />} />
              </Menu>
            </Card>
          </GridItem>
          <GridItem xs={9}>
            <div style={{ width: '100%' }}>
              <h3 style={{ marginBottom: 16 }}>
                <FormattedMessage id="search.showingResultsFor" values={{ term }} />
              </h3>
              {results.users && results.users.length > 0 && (
              <>
                <h3 style={{ marginBottom: 8 }}>
                  <FormattedMessage id="common.users" />
                </h3>
                <div style={{ width: '100%' }}>
                  <GridContainer>
                    {results.users.map((user) => (
                      <GridItem xs={3}>
                        <UserCard user={user.user} />
                      </GridItem>
                    ))}
                  </GridContainer>
                </div>
              </>
              )}
            </div>
          </GridItem>
        </GridContainer>
      ) : (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Loader size={128} />
        </div>
      )}
    </Container>
  );
};
