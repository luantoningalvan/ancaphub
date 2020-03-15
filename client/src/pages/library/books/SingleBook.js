import React, { useEffect, useState, Fragment } from "react";
import Paper from "../../../components/ui/Paper";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import DownloadIcon from "react-ionicons/lib/IosDownload";
import filesize from "filesize";
import querystring from "querystring";
import defaultThumbnail from "../../../assets/default-book-cover.jpg";
import styled from "styled-components";
//import Categories from "../../../components/categories/showElementCategories";
//import Ratings from "../../../components/library/ratings";
//import InvitedBy from "../../../components/profile/invitedBy"
//import UnavaliableContent from "../../../components/error/unavaliableContent"

function SingleBook({ match, fetchItem, book }) {
  const Title = styled.h2`
    font-weight: bold;
    color: ${props => props.theme.pallete.text.primary};
    font-size: 2.125rem;
    margin-bottom: 5px;
  `;

  const Author = styled.h3`
    font-weight: lighter;
    color: ${props => props.theme.pallete.text.primary};
    font-size: 1.25rem;
    margin-bottom: 34px
  `;

  const BookCover = styled.img`
    width: 100%;
  `;

  const Banner = styled.div`
    background: url(${props => (props.cover ? props.cover : defaultThumbnail)}) rgba(0, 0, 0, 0.5);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    width: 100%;
    height: 230px;

    &:after {
      height: 230px;
      width: 100%;

      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 1) 100%
      );
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.7;
    }
  `;

  return (
    <>
      {true ? (
        <>
          <Banner cover="https://ancaphub.s3.sa-east-1.amazonaws.com/1580105305533-o-que-deve-ser-feito.jpg"/>
          <div style={{marginTop: -137, position:"absolute", width: "inherit"}}>
            <Container>
              <div style={{display: "grid", gridTemplateColumns: "33.3333% auto", gap: "1.4em"}}>
                <div>
                  <Paper>
                    <BookCover src="https://ancaphub.s3.sa-east-1.amazonaws.com/1580105305533-o-que-deve-ser-feito.jpg" />
                    <div style={{ padding: 10}}>
                    <Button fullwidth disableElevation color="secondary">Baixar</Button>
                    <Button fullwidth disableElevation variant="outlined" style={{marginTop: 5}}>Salvar</Button>
                    <Button fullwidth disableElevation variant="outlined" style={{marginTop: 5}}>Adionar a uma Lista</Button>
                    <Button fullwidth disableElevation variant="outlined" style={{marginTop: 5}}>Compartilhar</Button>
                    </div>
                  </Paper>
                  {/*<InvitedBy user={user} />*/}
                  InvitedBy
                </div>
                <div>
                  {/*<Categories categories={categories} />*/}
                  <div style={{padding:"15px 0px"}}>
                  Categories
                  </div>
                  <Title>O que deve ser feito</Title>
                  <Author>Hans-Hermann Hoppe</Author>
                  <div>
                  Por qual razão tantas pessoas estão insatisfeitas com o sistema de ensino atual? Por que gerações de reformadores fracassaram em melhorar o sistema educacional, e ainda fizeram com que ele se degenerasse cada vez mais em direção a um nível de mediocridade cada vez pior? Nesta monografia acadêmica e radical, Rothbard identifica os pontos cruciais do sistema educacional que o condenaram ao fracasso: em cada um de seus níveis, do financiamento ao comparecimento, o sistema se baseia na compulsão e não no consentimento voluntário. E isso acarreta em algumas consequências. O currículo é politizado para refletir as prioridades ideológicas do regime no poder. Ocorre um contínuo rebaixamento dos padrões para se adaptarem ao menor denominador comum. Não se permite que as crianças mais inteligentes desenvolvam seus potenciais, as necessidades especiais de determinadas crianças são negligenciadas, e os alunos médios são reduzidos a engrenagens anônimas de uma máquina. Conforme Kevin Ryan, da Universidade de Boston, indica na introdução, se a reforma educacional algum dia conseguir provocar mudanças fundamentais, ela terá que começar com um repensar completo do ensino público como o que Rothbard nos oferece aqui.
                  </div>
                  <div my={2}>{/*<Ratings item={book.item} />*/}</div>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : (
        <Container>
          <div mt={2}>
            Indisponível
            {/*<UnavaliableContent />*/}
          </div>
        </Container>
      )}
    </>
  );
};

export default SingleBook;
