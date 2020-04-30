import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UploadButton from 'react-ionicons/lib/IosCloudUpload';
import { isEmpty } from 'lodash';
import Container from '../../components/ui/Container';
import Hero from '../../components/ui/Hero';
import GridContainer from '../../components/ui/GridContainer';
import GridItem from '../../components/ui/GridItem';
import Card from '../../components/ui/Card';
import CardHeader from '../../components/ui/CardHeader';
import LibraryCard from '../../components/library/LibraryCard';
import Menu from '../../components/ui/Menu';
import MenuItem from '../../components/ui/MenuItem';
import Tab from '../../components/ui/Tab';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import { loadCategoriesRequest } from '../../actions/categories';
import { getItemsRequest } from '../../actions/library';
import LoadContent from '../../components/ui/LoadContent';
import Paper from '../../components/ui/Paper';


export default () => {
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { items: categories, loading: loadingCategories } = useSelector(
    (state) => state.categories,
  );
  const { items, loading } = useSelector((state) => state.library);
  const dispatch = useDispatch();
  const { type: typeParam } = useParams();

  useEffect(() => {
    dispatch(loadCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    setType(() => typeParam);
  }, [typeParam]);

  useEffect(() => {
    const types = {
      articles: 'article',
      books: 'book',
      videos: 'video',
    };
    dispatch(getItemsRequest({ type: types[typeParam], category: selectedCategory }));
  }, [typeParam, selectedCategory, dispatch]);

  return (
    <Container>
      <Hero
        title={<FormattedMessage id="common.library" />}
        description={<FormattedMessage id="home.features.0" />}
        actions={(
          <Link to="/library/contribute">
            <Button color="primary" to="/library/contribute">
              <UploadButton />
              <span>
                <FormattedMessage id="library.contribute" />
              </span>
            </Button>
          </Link>
        )}
      />

      <GridContainer spacing={2} style={{ marginTop: 8 }}>
        <GridItem xs={3}>
          <Card style={{ width: '100%' }}>
            <CardHeader style={{ paddingBottom: 8 }}>
              <h3>
                <FormattedMessage id="common.categories" />
              </h3>
            </CardHeader>
            <Menu>
              <LoadContent loading={loadingCategories}>
                <MenuItem
                  label={<FormattedMessage id="common.all" />}
                  current={selectedCategory === ''}
                  onClick={() => setSelectedCategory('')}
                />
                {categories.map((category) => (
                  <MenuItem
                    label={category.name}
                    current={selectedCategory === category._id}
                    onClick={() => setSelectedCategory(category._id)}
                  />
                ))}
              </LoadContent>
            </Menu>
          </Card>
        </GridItem>
        <GridItem xs={9}>
          <div style={{ width: '100%' }}>
            <Tabs>
              <Tab
                label={<FormattedMessage id="common.all" />}
                current={typeParam === undefined}
                link="/library"
              />
              <Tab
                label={<FormattedMessage id="library.articles" />}
                current={typeParam === 'articles'}
                link="/library/articles"
              />
              <Tab
                label={<FormattedMessage id="library.books" />}
                current={typeParam === 'books'}
                link="/library/books"
              />
              <Tab
                label={<FormattedMessage id="library.videos" />}
                current={typeParam === 'videos'}
                link="/library/videos"
              />
            </Tabs>

            <div style={{ marginTop: 16 }}>
              <LoadContent loading={loading}>
                {isEmpty(items) ? (
                  <Paper padding>
                    <FormattedMessage id="library.noneFound" />
                  </Paper>
                ) : (
                  <GridContainer spacing={2}>
                    {items.map((item) => (
                      <GridItem xs={4}>
                        <LibraryCard item={item} />
                      </GridItem>
                    ))}
                  </GridContainer>
                )}
              </LoadContent>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    </Container>
  );
};
