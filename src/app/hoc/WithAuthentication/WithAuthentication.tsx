import React, { useEffect, ComponentType } from 'react'
import { useHistory } from 'react-router-dom'

type Props = {}

const WithAuthentication = (Component: ComponentType) => (props: Props) => {
  const history = useHistory()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login')
    }
  })

  return (
    <Component {...props} />
  )
}

export default WithAuthentication
