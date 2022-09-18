class Auth {
    constructor() {
        this.base_url = 'https://auth.nomoreparties.co'
    }

    _getResponse (res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
        return res.json()
    }

    register(password, email) {
        return fetch(`${this.base_url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then(this._getResponse)
    }
}

const auth = new Auth()

export {auth}