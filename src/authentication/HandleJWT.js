const tokenKey = 'token';
const expirationKey = 'token-expiration';

export function saveToken(authenticationResponse){
    localStorage.setItem(tokenKey,authenticationResponse.token);
    localStorage.setItem(expirationKey,authenticationResponse.expiration.toString());
}

export function getClaims() {
    const token = localStorage.getItem(tokenKey);

    if(!token)
    {
        return[];
    }

    const expiration = localStorage.getItem(expirationKey);
    const expirationDate = new Date(expiration);
    
    if(expiration <= new Date()){
        logout();
        return []; 
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const response = [];
    for(const property in dataToken){
        response.push( property,dataToken[property]);
    }
    return response;
}

export function logout(){
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
}