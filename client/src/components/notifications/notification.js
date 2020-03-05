import React from 'react'

//Other
import isEmpty from 'is-empty';

//Templates
import ApprovedItem from './templates/approvedItem'
import RatedItem from './templates/ratedItem'
import UserFollowed from './templates/userFollowed'

const templates = {
  approved_item: () => ApprovedItem,
  rated_item: () => RatedItem,
  user_followed: () => UserFollowed
}

const Notification = ({notification}) => {
  const NotificationTemplate = !isEmpty(notification) ? templates[notification.type]() : <p>Ocorreu um Erro</p>

  return (
    <NotificationTemplate notification={notification}/>
  )
}

export default Notification