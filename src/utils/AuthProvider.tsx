let user: {username: string, token: string} = {username: '', token: ''};

export function getUser(){
    return user;
}

export function isLogged(){
    return user.token !== ''
}

export function setUser(newUser: {username: string, token: string}) {
    user = newUser;
}

export function logOut(){
    user = {username: '', token: ''}
}