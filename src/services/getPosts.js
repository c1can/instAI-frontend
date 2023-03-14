export function getPosts () {
    return fetch(`${import.meta.env.VITE_API_URL}/community`)
        .then(response => response.json())
        .catch(error => console.log(error))
}