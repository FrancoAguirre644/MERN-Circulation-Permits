const baseURL = "http://localhost:5000/api/v1"

export const getData = async (url, token) => {
    const res = await fetch(`${baseURL}/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('jwt')}`,
        },
    })

    const data = await res.json()

    return data
}

export const postData = async (url, post, token) => {

    const res = await fetch(`${baseURL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const putData = async (url, post, token) => {
    const res = await fetch(`${baseURL}/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    return data
}

export const patchData = async (url, post, token) => {
    const res = await fetch(`${baseURL}/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()

    return data
}

export const deleteData = async (url, token) => {
    const res = await fetch(`${baseURL}/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
    })

    const data = await res.json()

    return data
}