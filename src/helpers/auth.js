export const getToken = () => {
    return localStorage.getItem('authToken');
}
export const setToken = (authToken) => {
    return localStorage.setItem('authToken', authToken);
}
export const removeToken = () => {
    return localStorage.removeItem('authToken');
}