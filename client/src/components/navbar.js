import React, {useContext} from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };

  return(
    <nav>
      <div className={'nav-wrapper row teal lighten-2'}>
        <div className={'col s12'}>
          <span className={'brand-logo'}>Сокращение ссылок</span>
          <ul id="nav-mobile" className={'right hide-on-med-and-down'}>
            <li>
              <NavLink to={'/create'}>Создать</NavLink>
            </li>
            <li>
              <NavLink to={'/links'}>Ссылки</NavLink>
            </li>
            <li>
              <a onClick={logoutHandler} href="/">Выйти</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
