import logo from '../images/logos/logo.svg'
import {Link, useLocation} from "react-router-dom";


function Header() {
    const location = useLocation()

    return (
        <header className="header">
            <img src={logo} alt="Логотип Место Russia" className="header__logo"/>

            {location.pathname === "/sign-up" ? <Link to='/sign-in'>Вход</Link> : <Link to='/sign-up'>Регистрация</Link>}
        </header>
    )
}

export default Header
