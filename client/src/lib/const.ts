export const SERVER_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

export const signOutUserErrors = ["Unauthorized"];
export const createTodoErrors = ["Unauthorized", "Title is required"];
export const deleteTodoErrors = ["Unauthorized", "Todo does not exist"];
export const updateTodoErrors = ["Unauthorized", "Todo does not exist"];
