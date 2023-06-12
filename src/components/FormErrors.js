function FormErrors(errors){
    
    try{
        errors = errors.errors;
        if(Array.isArray(errors.Email) && Array.isArray(errors.Password))
        {
            errors =errors.Email.concat(errors.Password)
        }
        else if(Array.isArray(errors.Email))
            errors = errors.Email
        else if( Array.isArray(errors.Password))
            errors = errors.Password
        if(typeof(errors === 'string'))
            errors = [errors]
        if(errors.length > 1 || errors[0] != '') 
        return(
            <div>
                <ul>
                    {errors.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        )
        }
    catch(exception){     
        }
}

export default FormErrors