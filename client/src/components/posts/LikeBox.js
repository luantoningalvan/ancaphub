import React, { useEffect, memo } from 'react';
import CloseIcon from 'react-ionicons/lib/IosClose';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Dialog from '../ui/Dialog';
import Card from '../ui/Card';
import CardHeader from '../ui/CardHeader';
import CardBody from '../ui/CardBody';
import IconButton from '../ui/IconButton';
import { getPostLikesRequest } from '../../actions/posts';
import UserList from '../users/UserList';
import Loader from '../ui/Loader';

const LikeBox = ({ open, onClose, postId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.posts);

  useEffect(() => {
    if (open) {
      dispatch(getPostLikesRequest(postId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog show={open}>
      {open && (
        <Card style={{ minWidth: 350 }}>
          <CardHeader>
            <h3><FormattedMessage id="common.likePlural" /></h3>
            <IconButton color="primary" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </CardHeader>
          <CardBody>
            {likes.postLikesLoading ? (
              <Loader size={48} />
            ) : (
              <UserList users={likes.items[postId].likes} />
            )}
          </CardBody>
        </Card>
      )}
    </Dialog>
  );
};

export default memo(LikeBox);
