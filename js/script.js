//      Данные в профиле
const profileInfo = document.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title-text");
const profileSubtitle = profileInfo.querySelector(".profile__subtitle");

//      Popup профиля
const popupContainerEditProfile = document.querySelector(".popup_edit-profile");
const profileEdit = popupContainerEditProfile.querySelector(".edit-profile");
const popupInputTypeName = popupContainerEditProfile.querySelector(".popup__input_type_name");
const popupInputTypeInfo = popupContainerEditProfile.querySelector(".popup__input_type_info");

//      Попап добавления карточки
const popupContainerAddCard = document.querySelector(".popup_add-card");
const cardAdd = popupContainerAddCard.querySelector(".add-card");
const popupInputNameCard = popupContainerAddCard.querySelector(".popup__input_name_card");
const popupInputFotoCard = popupContainerAddCard.querySelector(".popup__input_foto_card");

//      Контейнер popup
const popups = document.querySelectorAll(".popup");

//      Шаблон
const galleryTemplate = document.querySelector(".element-template");

//      Кнопка редактирования профиля
const popupButtonOpen = document.querySelector(".profile__edit-button");

//      Кнопка добавления карточки
const popupButtonAdd = document.querySelector(".profile__add-button");

//      Кнопка закрытия попапа
const popupCloseButtons = document.querySelectorAll(".popup__button-close");

//      Контейнер карточек
const elements = document.querySelector(".elements");

//      Popup открытой карточки
const popupGallery = document.querySelector(".popup_gallery");
const fullImage = document.querySelector(".full-image__image");
const fullImageCaption = document.querySelector(".full-image__caption");

//  Кнопка сохранения профиля
const popupButtonEditProfile = document.querySelector(".popup__container-submit-button_edit-button");


const popupButtonAddCard = document.querySelector(".popup__container-submit-button_add-button");


// Inputы popup профиля
const inputList = Array.from(popupContainerEditProfile.querySelectorAll(".popup__input"));

const inputListAddCard = Array.from(popupContainerAddCard.querySelectorAll(".popup__input"));

function openProfilePopup() {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeInfo.value = profileSubtitle.textContent;
    toggleButtonState(inputList, popupButtonEditProfile);
    inputList.forEach((inputElement) => {
        checkInputValidity(popupContainerEditProfile, inputElement);
    });
    openPopup(popupContainerEditProfile);
}

function openAddCardPopup() {
    cardAdd.reset();
    toggleButtonState(inputListAddCard, popupButtonAddCard);
    openPopup(popupContainerAddCard);
}

function openImagePopup(link, name) {
    fullImage.src = link;
    fullImage.alt = name;
    fullImageCaption.textContent = name;
    openPopup(popupGallery);
}

/*      Закрытие попапа при нажатии на Esc        */
function closePopupEsc(e) {
    if (e.code === "Escape") {
        const popupOpen = document.querySelector(".popup_opened");
        closePopup(popupOpen);
    }
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
}

function closePopup(popup) {
    document.removeEventListener("keydown", closePopupEsc);
    popup.classList.remove("popup_opened");
}

/*      Первоначальная загрузка карточек        */
function loadCards(container, data) {
    const cardsElements = data.map(getCard);
    container.append(...cardsElements);
}

/*      Работа с шаблоном карточки        */
function getCard(card) {
    const galleryElement = galleryTemplate.content.cloneNode(true);
    const galleryEl = galleryElement.querySelector(".element__image");
    const galleryElTitle = galleryElement.querySelector(".element__title");
    galleryEl.src = card.link;
    galleryEl.alt = card.name;
    galleryElTitle.textContent = card.name;
    const removeButton = galleryElement.querySelector(".element__delete-button");
    removeButton.addEventListener("click", removeCard);
    const likeButton = galleryElement.querySelector(".element__like-button");
    likeButton.addEventListener("click", likeCard);
    galleryEl.addEventListener("click", () => openImagePopup(card.link, card.name));
    return galleryElement;
}

//      Добавляем карточку
function appendCard(evt) {
    evt.preventDefault();
    elements.prepend(
        getCard({
            name: popupInputNameCard.value,
            link: popupInputFotoCard.value,
        })
    );
    closePopup(popupContainerAddCard);
}

//      Удаляем карточку
function removeCard(evt) {
    const targetEl = evt.target;
    const targetItem = targetEl.closest(".element");
    targetItem.remove();
}

//      Ставим-убираем класс element__like-button_active с кнопки like
function likeCard(evt) {
    const targetEl = evt.target;
    targetEl.classList.toggle("element__like-button_active");
}

//      Данные с попапа редактирования профиля переносятся в основной профиль   */
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTypeName.value;
    profileSubtitle.textContent = popupInputTypeInfo.value;
    closePopup(popupContainerEditProfile);
}

//      Вызов функции первоначальной загрузки карточек
loadCards(elements, initialCards);

cardAdd.addEventListener("submit", appendCard); //  Сохранение карточки
popupButtonAdd.addEventListener("click", openAddCardPopup); //  Открытие попапа добавления карточки
popupButtonOpen.addEventListener("click", openProfilePopup); //  Открытие попапа изменения профиля
profileEdit.addEventListener("submit", handleProfileFormSubmit); //   Сохранение данных в профиль

popupCloseButtons.forEach((item) => {
    item.addEventListener("click", () => closePopup(item.closest(".popup"))); //  Закрытие попапа по крестику
});

//  Закрытие попапа по нажатию на оверлей
popups.forEach((item) => {
    item.addEventListener("click", (e) => {
        if(e.target === item) 
            closePopup(item.closest(".popup"));
    });
});
    