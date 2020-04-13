import React, { useEffect, memo } from "react";
import Dialog from "../ui/Dialog";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import CardBody from "../ui/CardBody";
import IconButton from "../ui/IconButton";
import CloseIcon from "react-ionicons/lib/IosClose";
import { useDispatch, useSelector } from "react-redux";
import { getPostLikesRequest } from "../../actions/posts";
import UserList from '../users/UserList'

const LikeBox = ({ open, onClose, postId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.posts);

  useEffect(() => {
    if (open) {
      dispatch(getPostLikesRequest(postId));
    }
  }, [open]);

  return (
    <Dialog show={open}>
      {open && (
        <Card style={{ minWidth: 350 }}>
          <CardHeader>
            <h3>Curtidas</h3>
            <IconButton color="primary" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </CardHeader>
          <CardBody>
            {likes.postLikesLoading ? (
              <p>Carregando</p>
            ) : (
              <UserList users={likes.items[postId].likes}/>
            )}
          </CardBody>
        </Card>
      )}
    </Dialog>
  );
};

export default memo(LikeBox);
