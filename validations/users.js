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

    if (!update){
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

    }

    // check first name
    if (userData.firstName && userData.firstName.length < 2) {
        return {
            isValid : false,
            message : "First name must be at least 2 characters"
        }
    }

    if (userData.lastName && userData.lastName.length < 2) {
        return {
            isValid : false,
            message : "last name must be at least 2 characters"
        }
    }

    if (userData.phoneNumber && userData.phoneNumber.length < 10) {
        return {
            isValid : false,
            message : "Phone number must be at 10 characters"
        }
    }
    


    return {
        isValid : true,
        message : "user data is valid"
    }

}

module.exports = {validateUserData}
