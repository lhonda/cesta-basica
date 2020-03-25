import React from 'react'
import PropTypes from 'prop-types'

import './Home.scss'

import { LogoHorizontal } from '../../components/Logo'
import { Button, ButtonTypes } from '../../components/Button'
import { GroupIcons } from '../../components/HomeIcons'
import { homeContentTitle, homeContentSubTitle, homeContent } from '../../utils/strings'

const Home = ({ history }) => {
  const goToLogin = () => {
    history.push('login')
  }

  return (
    <div style={{ width: '100vw' }}>
      <div className="headerHome">
        <LogoHorizontal />
        <Button handleClick={goToLogin} type={ButtonTypes.FILL} size={ButtonTypes.THIN} message="Entrar" />
      </div>
      <div className="contentHome">
        <h3>{homeContentTitle}</h3>
        <GroupIcons />
      </div>
      <div className="footerHome">
        <h3 className="footerHome--subtitle">{homeContentSubTitle}</h3>
        <p>{homeContent}</p>
      </div>
    </div>
  )
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

export default Home
