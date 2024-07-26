import React from 'react'
import { useParams } from 'react-router-dom'

const CrewDetail = () => {

  const { name } = useParams()
  return (
    <div>
      ActorDetail {name}
    </div>
  )
}

export default CrewDetail
