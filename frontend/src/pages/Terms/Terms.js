import React from 'react'
import PropTypes from 'prop-types'
import { connect } from '../../store'
import { Title } from '../../components/Title'
import { SubTitle } from '../../components/SubTitle'
import { Terms } from '../../components/Terms'
import { Button, ButtonTypes } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import './Term.scss'

import { declareTermUse, cancel, singin, titleTerms } from '../../utils/strings'
import { handleCheckedDeclararion } from '../../services/handles'

function TermsPage({ store, dispatch }) {
  return (
    <div className="container">
      <div className="header">
        <Title message={titleTerms} />
      </div>
      <div className="main">
        <SubTitle message="1.1 Introducao" />
        <Terms content="introductionCompromise" />
        <SubTitle message="1.2 Target" />
        <Terms content="tartargetCompromiseget" />
        <SubTitle message="2 Conclusion" />
        <Terms content="conclusionCompromise" />
        <SubTitle message="2 Conclusion" />
        <Terms content="conclusionCompromise" />
        <SubTitle message="2 Conclusion" />
        <Terms content="conclusionCompromise" />
        <Checkbox
          handleChecked={() => handleCheckedDeclararion(store, dispatch)}
          checked={store.declaration}
          message={declareTermUse}
        />
      </div>
      <div className="footer">
        <Button type={ButtonTypes.OUTLINE} message={cancel} />
        <Button disable={!store.declaration} message={singin} />
      </div>
    </div>
  )
}
TermsPage.propTypes = {
  store: PropTypes.shape({
    declaration: PropTypes.bool,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(TermsPage)
