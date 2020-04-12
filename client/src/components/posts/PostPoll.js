import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// Redux
import VotedIcon from 'react-ionicons/lib/IosCheckmarkCircleOutline';
import { votePostPollRequest } from '../../actions/posts';

// Icons

const PostPollWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 5px;
  position: relative;
  margin-top: 1em;
  border: 1px solid ${(props) => props.theme.palette.border};
`;


const PostPollOption = styled.div`
  font-weight: 700;
  width: 100%;
  height: 48px;
  position: relative;
  padding: 0.5em 0;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.palette.border};
  margin: 0.5em 0;
  cursor: ${(props) => (props.hasVoted ? 'default' : 'pointer')};
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: ${(props) => (props.hasVoted ? 'transparent' : props.theme.palette.border)};
  }
  & > span {
    position: absolute;
    top: 12px;
    left: 0.5em;
    z-index: 2;
  }
`;


const PostPollOptionProgress = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.theme.palette.secondary};
  border-radius: 5px;
`;


const PostPoll = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hasVoted = post.poll.allVotes.includes(user._id);

  const handleVote = ({ pollId, vote, postId }) => {
    if (hasVoted) return;
    dispatch(votePostPollRequest({ postId, pollId, vote }));
  };
  return (
    <PostPollWrap>
      {post.poll.options.map((option) => (
        <>
          <PostPollOption hasVoted={hasVoted} onClick={() => handleVote({ pollId: post.media.data, postId: post._id, vote: option.title })}>
            <span>
              {option.title}
              {' '}
              {option.votes && option.votes.includes(user._id) && <VotedIcon color="white" fontSize="1em" />}
              {' '}
            </span>
            { hasVoted && <PostPollOptionProgress percentage={(option.votesCount / post.poll.allVotesCount) * 100} /> }
          </PostPollOption>
          { hasVoted && (
            <div display="flex" style={{ marginBottom: '.5em' }}>
              <small style={{ margin: '0 .25em' }}>
                {(option.votesCount / post.poll.allVotesCount) * 100}
                % -
                {' '}
                {option.votesCount}
                {' '}
                voto(s)
              </small>
            </div>
          ) }
        </>
      ))}
      <small>
        Total de votos:
        {' '}
        {post.poll.allVotesCount || 0}
      </small>
    </PostPollWrap>
  );
};
export default PostPoll;
