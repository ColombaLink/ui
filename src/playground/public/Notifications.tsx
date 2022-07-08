import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Notification } from '~/components/Notification'
import { ArrowRightIcon, CheckCircleIcon, CloseCircleIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { createNotification } from '~/utils/createNotification'
import ComponentViewer from '../ComponentViewer'

export const Notifications = () => {
  return <ComponentViewer component={Notification} />
}
