import React from "react";
import UserCard from "../../components/users/UserCard";
import GridContainer from "../../components/ui/GridContainer";
import GridItem from "../../components/ui/GridItem";
import Paper from "../../components/ui/Paper";
import LoadContent from "../../components/ui/LoadContent";

const users = [
  {
    user: {
      _id: "5e322ab7fefdfa7cb9843640",
      name: "Samuel Casseb",
      username: "cassebsamuel",
      avatar:
        "https://ancaphub.s3.amazonaws.com/1580346118891-Screenshot_20200112-021949.png",
      bio: "Estudando Tec. em Comércio Exterior",
      isVerified: false,
      followersCount: 27,
      followingCount: 58,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: "5e2f354bf125e30409ad20dd",
      name: "Leonardo",
      username: "leonardo",
      bio: "Oi.",
      isVerified: false,
      followersCount: 24,
      followingCount: 21,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: "5e2f17eaf125e30409ad1f0d",
      name: "Lini",
      username: "lini",
      avatar:
        "https://ancaphub.s3.amazonaws.com/1580144923968-images%20%288%29.jpeg",
      bio: "",
      isVerified: false,
      followersCount: 30,
      followingCount: 65,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: "5e40ac5cfa661f054fde466b",
      name: "Lucas Zanotti",
      username: "lucaszanotti",
      avatar:
        "https://ancaphub.s3.sa-east-1.amazonaws.com/1581391930006-Untitled-2.png",
      bio: "",
      isVerified: false,
      followersCount: 24,
      followingCount: 66,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: "5e2f5715f125e30409ad213d",
      name: "@WaifuSul",
      username: "waifusul",
      avatar:
        "https://ancaphub.s3.sa-east-1.amazonaws.com/file-1586815729929.jpeg",
      bio:
        "steamcommunity.com/id/deadwar666 Discord: Dead...#9201 myanimelist.net/profile/DeadWar",
      isVerified: false,
      followersCount: 35,
      followingCount: 80,
      followed_by: true,
      following: true,
    },
  },
  {
    user: {
      _id: "5e55391f5606b61e900b4159",
      name: "Victor Matheus",
      username: "victor",
      avatar:
        "https://ancaphub.s3.sa-east-1.amazonaws.com/file-1582647960889.jpg",
      bio: "",
      isVerified: false,
      followersCount: 8,
      followingCount: 17,
      followed_by: true,
      following: true,
    },
  },
  
];

const Members = () => {
  return (
    <LoadContent loading={false}>
      {users.length === 0 ? (
        <Paper padding>Esse usuário não é seguido por ninguém.</Paper>
      ) : (
        <GridContainer spacing={2} style={{ marginTop: 8 }}>
          {users.map((user) => (
            <GridItem xs={3}>
              <UserCard user={user.user} />
            </GridItem>
          ))}
        </GridContainer>
      )}
    </LoadContent>
  );
};

export default Members;
