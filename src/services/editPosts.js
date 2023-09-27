export async function ediPosts(username, newUsername) { 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/community/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({actualUsername: username, newUsername})
    })
    await response.json()
}