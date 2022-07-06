document.addEventListener('DOMContentLoaded', () => {
  // const cookiePopup = document.querySelector('.cookie'),
  //     acceptButton = cookiePopup.querySelector('.cookie__accept'),
  //     declineButton = cookiePopup.querySelector('.cookie__decline'),
  //     consentName = 'user_consent';

  // const cookieStorage = {
  //     getItem: (key) => {
  //         const cookies = document.cookie
  //             .split(';')
  //             .map((cookie) => cookie.split('='))
  //             .reduce(
  //                 (acc, [key, value]) => ({
  //                     ...acc,
  //                     [key.trim()]: value,
  //                 }),
  //                 {}
  //             );
  //         return cookies[key];
  //     },
  //     setItem: (key, value) => {
  //         const date = new Date(new Date().getTime() + 2592000000).toUTCString();
  //         document.cookie = `${key}=${value};expires=${date}`;
  //     },
  // };

  // function hasConsent() {
  //     return cookieStorage.getItem(consentName) === 'true';
  // }

  // function toggleStorage(value) {
  //     cookieStorage.setItem(consentName, value);
  // }

  // function toggleCookiePopupVisibility(isVisible = false) {
  //     isVisible ? cookiePopup.classList.add('visible') : cookiePopup.classList.remove('visible');
  // }

  // if (!hasConsent()) {
  //     setTimeout(() => toggleCookiePopupVisibility(true), 1000);
  // }

  // acceptButton.addEventListener('click', () => {
  //     toggleStorage(true);
  //     toggleCookiePopupVisibility();
  // });

  // declineButton.addEventListener('click', () => {
  //     toggleStorage(false);
  //     toggleCookiePopupVisibility();
  // });

  class Cookie {
    constructor(cookiePopupSelector, acceptButtonSelector, declineButtonSelector, activeClass) {
      this.popup = document.querySelector(cookiePopupSelector);
      this.accept = this.popup.querySelector(acceptButtonSelector);
      this.decline = this.popup.querySelector(declineButtonSelector);
      this.activeClass = activeClass;
      this.consentName = 'user_consent';
      this.expiresDate = new Date(new Date().getTime() + 2592000000).toUTCString();
    }

    getItem(key) {
      const cookies = document.cookie
        .split(';')
        .map((cookie) => cookie.split('='))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key.trim()]: value,
          }), {}
        );
      return cookies[key];
    }

    setItem(key, value) {
      document.cookie = `${key}=${value};expires=${this.expiresDate}`;
    }

    hasConsent() {
      return this.getItem(this.consentName) === 'true'
    }

    toggleStorage(value) {
      this.setItem(this.consentName, value);
    }

    toggleCookiePopupVisibility(isVisible = false) {
      isVisible ? this.popup.classList.add('visible') : this.popup.classList.remove('visible');
    }

    bindTriggers() {
      this.accept.addEventListener('click', () => {
        this.toggleStorage(true);
        this.toggleCookiePopupVisibility();
      });

      this.decline.addEventListener('click', () => {
        this.toggleStorage(false);
        this.toggleCookiePopupVisibility();
      });
    }

    init() {
      this.bindTriggers();

      try {
        if (!this.hasConsent()) {
          setTimeout(() => this.toggleCookiePopupVisibility(true), 1000);
        }
      } catch (e) {
        alert('Error: ' + e);
      }
    }
  }

  new Cookie('.cookie', '.cookie__accept', '.cookie__decline', 'visible', ).init();
});