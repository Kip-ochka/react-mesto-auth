import logo from '../images/logos/logo.svg'
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Место Russia" className="header__logo"/>
            <Link to='sing-up'>Регистрация</Link>
        </header>
    )
}

export default Header
