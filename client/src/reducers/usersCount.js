import { Types } from '../actions/users';
import arrayToObject from '../utils/arrayToObject';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_USERS_COUNT: {
      const data = action.payload.map((obj) => ({
        _id: obj.user._id,
        followersCount: obj.user.followersCount,
        followingCount: obj.user.followingCount,
      }));

      return {
        ...state,
        ...arrayToObject(data, '_id'),
      };
    }
    default:
      return state;
  }
};
