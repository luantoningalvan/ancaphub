import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/ui/Container";
import Hero from "../../components/ui/Hero";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Card from "../../components/ui/Card";
import CardHeader from "../../components/ui/CardHeader";
import LibraryCard from "../../components/library/LibraryCard";
import Menu from "../../components/ui/Menu";
import MenuItem from "../../components/ui/MenuItem";
import Tab from "../../components/ui/Tab";
import Tabs from "../../components/ui/Tabs";
import Button from "../../components/ui/Button";
import UploadButton from "react-ionicons/lib/IosCloudUpload";
import { isEmpty } from "lodash";
import { loadCategoriesRequest } from "../../actions/categories";
import { getItemsRequest } from "../../actions/library";
import LoadContent from "../../components/ui/LoadContent";
import Paper from "../../components/ui/Paper";
import { Link } from 'react-router-dom'

export default () => {
  const [type, setType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { items: categories, loading: loadingCategories } = useSelector(
    (state) => state.categories
  );
  const { items, loading } = useSelector((state) => state.library);
  const dispatch = useDispatch();
  const { type: typeParam } = useParams();

  useEffect(() => {
    dispatch(loadCategoriesRequest());
  }, []);

  useEffect(() => {
    setType(() => typeParam);
  }, [typeParam]);

  useEffect(() => {
    const types = {
      'articles': 'article',
      'books': 'book',
      'videos': 'video',
    }
    dispatch(getItemsRequest({ type: types[typeParam], category: selectedCategory }));
  }, [typeParam, selectedCategory]);

  return (
    <Container>
      <Hero
        title="Biblioteca"
        description="Confira materiais de estudo libertários enviados pela comunidade"
        actions={
          <Link to="/library/contribute">
          <Button color="primary" to="/library/contribute">
            <UploadButton />
            <span>Contribuir</span>
          </Button>
          </Link>
        }
      />

      <GridContainer spacing={2} style={{ marginTop: 8 }}>
        <GridItem xs={3}>
          <Card style={{ width: "100%" }}>
            <CardHeader style={{ paddingBottom: 8 }}>
              <h3>Categorias</h3>
            </CardHeader>
            <Menu>
              <LoadContent loading={loadingCategories}>
                <MenuItem
                  label="Todas"
                  current={selectedCategory === ""}
                  onClick={() => setSelectedCategory("")}
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
          <div style={{ width: "100%" }}>
            <Tabs>
              <Tab
                label="Tudo"
                current={typeParam === undefined}
                link="/library"
              />
              <Tab
                label="Artigos"
                current={typeParam === "articles"}
                link="/library/articles"
              />
              <Tab
                label="Livros"
                current={typeParam === "books"}
                link="/library/books"
              />
              <Tab
                label="Vídeos"
                current={typeParam === "videos"}
                link="/library/videos"
              />
            </Tabs>

            <div style={{ marginTop: 16 }}>
              <LoadContent loading={loading}>
                {isEmpty(items) ? (
                  <Paper padding>Nada encontrado com esses critérios.</Paper>
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
