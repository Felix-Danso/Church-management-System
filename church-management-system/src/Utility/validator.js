//validate passwords for reset password
export const checkPassword = (state, setError,setSeverity) => {

    if (Object.values(state).every((element) => element !== "")) {

      if (state?.password !== state?.re_password) {
            setSeverity("error")
            setError("Passwords must be the same"); 
      } 

      else {

            var password = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/

            if (state?.password?.match(password))  {
                setSeverity("success");
                setError("successfull password")
            } 
            else {
                setSeverity("error")
                setError("Password must include uppercase, lowercase, special character and atleast 8 characters")
            }
      } 
      
    }
}

export const checkPasswordProfile = (state, setError) => {

    if (Object.values(state).every((element) => element !== "")) {

      if (state?.new_password !== state?.re_password) {
            setError("Passwords must be the same"); 
      } 

      else {

            var password = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/

            if (state?.new_password?.match(password))  {
                setError("")
            } 
            else {
                setError("Password must include uppercase, lowercase, special character and atleast 8 characters")
            }
      } 
      
    }
}

export function validateEmail(email)
{
    let mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

    
    return email.match(mailformat) ? false : true
    
        
}

export const AdminRegisterPassword = (state) => {

    if (state !== "") {

        let password = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/

        if (!state.match(password))  {
            return "Password must include uppercase, lowercase, special character and atleast 8 characters"
        }     
    } 
}

