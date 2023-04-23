export function getPosts () {
    return fetch(`${import.meta.env.VITE_API_URL}/community`)
        .then(response => response.json())
        .catch(() => console.log('hubo un error de conexión'))
}