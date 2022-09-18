import logo from '../images/logos/logo.svg'
import {Link, Route, Routes} from "react-router-dom";


function Header({}) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Место Russia" className="header__logo"/>
            <Routes>
                <Route
                    path="sign-up"
                    element={
                        <Link className="header__link" to="/sign-in">
                            Войти
                        </Link>
                    }
                />
                <Route
                    path="/"
                    element={
                        <Link
                            className="header__link"
                            to="/sign-in"
                        >
                            Выйти
                        </Link>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <Link className="header__link" to="/sign-up">
                            Регистрация
                        </Link>
                    }
                />
            </Routes>
        </header>
    )

}

export default Header
