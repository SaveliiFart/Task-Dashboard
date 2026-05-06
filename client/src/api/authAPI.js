const BASE = "http://localhost:5001/api/auth"

export const login = async (data) => {
    const res = await fetch(`${BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return res.json()
}

export const register = async (data) => {
    const res = await fetch(`${BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return res.json()
}

export const getProfile = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.json()
}

export const updateProfile = async (data) => {
    const token = localStorage.getItem("token")

    const res = await fetch(`${BASE}/profile`, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return res.json()
}