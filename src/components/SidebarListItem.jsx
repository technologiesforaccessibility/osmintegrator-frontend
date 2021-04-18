import React from 'react';
import {NavLink} from "react-router-dom";

function SidebarListItem(props) {
    return (
        <li className="nav-item nav-link active">
            <NavLink to={props.link}><span data-feather={props.dataFeather}/>{props.name}</NavLink>
        </li>
    );
}

export default SidebarListItem;
