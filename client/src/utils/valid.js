/* eslint-disable no-useless-escape */

export const validateRegister = (name, email, password, cf_password) => {

    if (!name || !email || !password || !cf_password) {
        return 'Please add all fields.'
    }

    if (!validateEmail(email)) {
        return 'Invalid email.'
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters.'
    }

    if (password !== cf_password) {
        return 'Confirm password did not match.'
    }

}

export const validateLogin = (email, password) => {

    if (!email || !password) {
        return 'Please add all fields.'
    }

    if (!validateEmail(email)) {
        return 'Invalid email.'
    }

}

export const validatePerson = (firstName, lastName, document) => {

    if (!firstName || !lastName || !document) {
        return 'Please add all fields.'
    }

    if (firstName.length < 3) return 'Please insert a valid first name.'

    if (lastName.length < 3) return 'Please insert a valid last name.'

    if (document.length <= 6) return 'Please insert a valid document.'

}

export const validateSite = (site, postalCode) => {

    if (!site || !postalCode) {
        return 'Please add all fields.'
    }
}

export const validateVehicle = (patent, brand, model, year) => {

    if (!patent || !brand || !model || !year) {
        return 'Please add all fields.'
    }

    var expPatentOld = /^[a-z]{3}[\d]{3}$/
    var expPatentNew = /^[a-z]{2}[\d]{3}[a-z]{2}$/

    if (!expPatentOld.test(patent) && !expPatentNew.test(patent))
        return 'Please insert a valid patent.'

}

export const validateDailyPermit = (personId, fromSiteId, toSiteId, reason) => {

    if (!personId || !fromSiteId || !toSiteId || !reason) {
        return 'Please add all fields.'
    }

}

function validateEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email);
}