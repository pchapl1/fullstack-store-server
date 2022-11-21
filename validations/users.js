const validateUserData = (userData, update) => {

    console.log('validating user')
    // check to see if email in userData
    if (!userData.email) {
        
        return {
            isValid : false,
            message : "you must provide an email"
        }
    }
    // check email length
    if (userData.email.length < 5) {
        return {
            isValid : false,
            message : "email must be at least 5 characters"
        }
    }

    // check to see is password in userData
    if (!userData.password ) {

        return {
            isValid : false,
            message : "you must provide a password"
        }
    }

    // check length of password
    if (userData.password < 8) {
        return {
            isValid : false,
            message : "password must be at least 8 characters"
        }
    }

    return {
        isValid : true,
        message : "user data is valid"
    }

}

module.exports = {validateUserData}
