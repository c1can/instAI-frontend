export function getStorage() {
    const currentUser = window.localStorage.getItem('currentUser')

    return currentUser ? JSON.parse(window.localStorage.getItem('currentUser')) : {session: null}
}