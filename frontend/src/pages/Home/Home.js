import React from 'react'

import './Home.scss'

import { LogoHorizontal } from '../../components/Logo'
import { Button, ButtonTypes } from '../../components/Button'
import { GroupIcons } from '../../components/HomeIcons'
import { homeContentTitle, homeContentSubTitle, homeContent } from '../../utils/strings'

const Home = () => {
  return (
    <>
      <div className="headerHome">
        <LogoHorizontal />
        <span className="teste">
          <Button className="headerHome--button" type={ButtonTypes.FILLHOME} message="Entrar" />
        </span>
      </div>
      <div className="contentHome">
        <h2>{homeContentTitle}</h2>
        <GroupIcons />
      </div>
      <div className="footerHome">
        <h3 className="footerHome--subtitle">{homeContentSubTitle}</h3>
        <p>{homeContent}</p>
      </div>
    </>
  )
}

export default Home
