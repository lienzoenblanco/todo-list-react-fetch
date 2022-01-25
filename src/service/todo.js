export const getTodos = () => {
	return fetch("https://assets.breatheco.de/apis/fake/todos/user/raquel", {
		method: "GET",
	});
};

export const setTodos = (todoList) => {
	return fetch("https://assets.breatheco.de/apis/fake/todos/user/raquel", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(todoList),
	});
};
