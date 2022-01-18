const key = '156Ee152558';


const storeToken = async (token) => {
    return await localStorage.setItem(key, token);
}

const getToken = async () => {
    return await localStorage.getItem(key);
}

const removeToken = () => {
    return localStorage.removeItem(key);

}

export { storeToken, getToken, removeToken };