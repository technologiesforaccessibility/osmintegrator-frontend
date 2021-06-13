import React from 'react';
import {NavLink} from "react-router-dom";

import '../stylesheets/footerContact.scss'

const FooterContact = () => {
    return (
        <div className="footer__container" >
            Login problem? Need to contact? Send us a  <NavLink to={"/googleForm/"}>
                message
            </NavLink>
        </div>
    );
};

export default FooterContact;