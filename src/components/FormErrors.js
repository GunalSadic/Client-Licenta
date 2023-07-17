function FormErrors(errors){
    
    try{
        errors = errors.errors
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
        console.log(exception)
        }
}

export default FormErrors