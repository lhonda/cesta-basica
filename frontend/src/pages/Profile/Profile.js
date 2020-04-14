import React from 'react'
import { profile,
         settings, 
         changePassword,
         changeEmail,
        signOut  } from '../../utils/strings'
import {icEmail, icPassword, icLogout} from '../../assets/icons/index'


import './Profile.scss'
// import { Link } from '../../components/Link'
import Setup from './Setup/Setup'

function Profile(){
    return(
        <div>
            <header className= "containerHeather">
                <h2> {profile} </h2>
            </header>
            <div className="containerUser">
                <h3>nome do login</h3>
                <p>emaildolider@lorem.com</p>
            </div>
            <div className= "containerSettings">
                <span> <p>{settings}</p> </span>
                <div>
                   <Setup 
                   icon={icEmail}
                   message={changeEmail}
                   />
                   <Setup 
                   icon={icPassword}
                   message={changePassword}
                   />
                    <Setup 
                    icon = {icLogout}
                    legend = "alo"
                    message={signOut}
                    />

                </div>
                
                
            </div>

        </div>
    )
}

export default Profile;