export const capitalizeWords = (fullName) => {
    let wordsSplit = fullName.split(' ')

    const capitalizedWords = wordsSplit.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizedWords.join(' ');
}

export const isName = (name) =>{
    const nameRegex = /^([A-Z][a-z]+ ?)+$/;
    return nameRegex.test(name) ? ''
        :
        'Please provide a valid name'
}

export const isEmpty = (input) => {
    return input ? '' : 'This field is required'
}

export const isValidPhoneNumber = (number) => {
    const phoneNumberRegex = /^0\d{9}$/;
    return phoneNumberRegex.test(number) ? ''
        :
        'Please provide valid phone number: 0583929293'

}

export const isValidNumber = (number) => {
    const numberRegex = /^\d+(\.\d+)?/;
    return numberRegex.test(number) ? ''
        :
        'Please enter a valid amount'
}
