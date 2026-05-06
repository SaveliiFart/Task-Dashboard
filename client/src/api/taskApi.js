const BASE_URL = "http://localhost:5001/api/tasks/"

export const getTasks = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(BASE_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
}

export const getOverview = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${BASE_URL}overview`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.json()
}

export const createTask = async (task) => {
    const token = localStorage.getItem("token")
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(task),
    })
    return res.json()
}

export const deleteTask = async (id) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${BASE_URL}${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const updateTask = async (id, data) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${BASE_URL}${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    return res.json()
}