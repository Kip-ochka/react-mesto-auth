import logo from '../images/logos/logo.svg'
import {Link, useLocation} from "react-router-dom";


function Header({loggedIn}) {
    const location = useLocation()

    return (
        <header className="header">
            <img src={logo} alt="Логотип Место Russia" className="header__logo"/>
            {loggedIn
                ?<Link className={'header__link'} to='sign-in'>Выход</Link>
                :location.pathname === "/sign-up"
                    ? <Link className={'header__link'} to='/sign-in'>Вход</Link>
                    : <Link className={'header__link'} to='/sign-up'>Регистрация</Link>}
        </header>
    )
}

export default Header
