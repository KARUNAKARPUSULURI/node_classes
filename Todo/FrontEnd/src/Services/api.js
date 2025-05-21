import { getTodosUrl } from "./constants"

export const getTodosData = async() => {
    const response = await fetch(getTodosUrl)
    const data = await response.json()
    return data
}
export const postTodosData = async(payload) => {
    const response = await fetch(getTodosUrl, payload)
    const data = await response.json()
    return data
}

export const updateTodoData = async(id, todoData) => {
    const response = await fetch(`${getTodosUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todoData)
    });
    const data = await response.json();
    return data;
}

export const deleteTodoData = async(id) => {
    const response = await fetch(`${getTodosUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}
