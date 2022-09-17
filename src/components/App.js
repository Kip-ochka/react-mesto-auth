import React, {useEffect, useState} from 'react'
import Footer from './Footer'
import Header from './Header'
import ImagePopup from './ImagePopup'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, Navigate} from "react-router-dom";
import {Register} from "./Register";
import {Login} from "./Login";
import {ProtectedRoute} from "./ProtectedRoute";
import {InfoTooltip} from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)

    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const [isLoadingAddCard, setIsLoadingAddCard] = useState(false)
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false)

    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopup();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    useEffect(() => {
        api.getUserInfo().then(userData => {
            setCurrentUser(userData)
        }).catch(err => console.log(err))
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }

    function handleUpdateUser(userInfo) {
        setIsLoadingUser(true)
        api.setUserInfo(userInfo.values).then(newUserData => {
            setCurrentUser(newUserData)
            closeAllPopup()
        }).finally(() => setIsLoadingUser(false)).catch(e => console.log(e))
    }

    function handleUpdateAvatar(avatarData) {
        setIsLoadingAvatar(true)
        api.updateAvatar(avatarData.avatar).then(newUserAvatar => {
            setCurrentUser(newUserAvatar)
            closeAllPopup()
        }).finally(() => {
            setIsLoadingAvatar(false)
        }).catch(e => console.log(e))
    }

    function handleAddCard(cardData) {
        setIsLoadingAddCard(true)
        api.addCard(cardData.values).then(newCard => {
            setCards([newCard, ...cards])
            closeAllPopup()
        }).finally(() => {
            setIsLoadingAddCard(false)
        }).catch(e => console.log(e))
    }

    function handleClosePopup(e) {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-button')) {
            //реализация закрытия по клику на оверлей либо по клику на крестик
            closeAllPopup();
        }
    }

    function closeAllPopup() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsImagePopupOpen(false)
        setIsInfoTooltipOpen(false)
        setSelectedCard({})
    }

    useEffect(() => {
        api.getInitialCards()
            .then(initialCards => {
                setCards(initialCards)
            })
            .catch((err) => console.log(err))
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(item => item._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        }).catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(setCards(cards.filter(item => item._id !== card._id)))
            .catch((err) => console.log(err))
    }

    return (<CurrentUserContext.Provider value={currentUser}>
            <div className='App'>
                <div className='page'>
                    <Header loggedIn={loggedIn}/>
                    <Routes>
                        <Route path='/' element={
                            <ProtectedRoute loggedIn={loggedIn}>
                                <Main
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    handleCardLike={handleCardLike}
                                    handleCardDelete={handleCardDelete}
                                />
                            </ProtectedRoute>}/>
                        <Route path='/sign-up' element={<Register/>}/>
                        <Route path='/sign-in' element={<Login/>}/>
                    </Routes>

                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleClosePopup}
                                      onUpdateUser={handleUpdateUser} isLoading={isLoadingUser}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleClosePopup} onAddCard={handleAddCard}
                                   isLoading={isLoadingAddCard}/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleClosePopup}
                                     onUpdateAvatar={handleUpdateAvatar} isLoading={isLoadingAvatar}/>
                    <PopupWithForm
                        name='confirm'
                        title='Вы уверены?'
                        buttonText='Да'
                        onClose={closeAllPopup}
                    ></PopupWithForm>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopup}
                        isOpen={isImagePopupOpen}
                    />
                    <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopup}/>
                </div>
            </div>
        </CurrentUserContext.Provider>

    )
}

export default App
