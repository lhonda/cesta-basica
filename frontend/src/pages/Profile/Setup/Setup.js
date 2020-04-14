import React from 'react'
// import Proptypes from 'prop-types'
import Link from '../../../components/Link/Link'
import './Setup.scss'

function Setup ({action, message, icon, legend}){
    return(
        <div className="container-setup">
            <div className="container-icon">
             <img src={icon} alt={legend}/>    
            </div>
            <Link 
            onClick= {action}
            message= {message}
            />
        </div>
    )
}

// Setup.propTypes = {
//     message: PropTypes.string.isRequired,
//     action: PropTypes.func.isRequired,
//   }

export default Setup;