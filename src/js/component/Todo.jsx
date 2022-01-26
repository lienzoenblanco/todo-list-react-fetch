import React, { useEffect, useState, useReducer } from "react";
import { getTodos, setTodos } from "../../service/todo.js";

const Todo = () => {
	const [todoList, setTodoList] = useState([]);
	const [todo, setTodo] = useState({ label: "", done: false });
	const [loading, setLoading] = useState(true);

	const getAllTodos = () => {
		getTodos()
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setTodoList(data);
				setLoading(false);
			})
			.catch((err) => {
				alert(err);
			});
	};

	const updateTodos = (newTodoList) => {
		setLoading(true);
		setTodos(newTodoList)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				getAllTodos();
			})
			.catch((err) => {
				alert(err);
			});
	};

	useEffect(() => {
		getAllTodos();
	}, []);

	const handleChange = (event) => {
		setTodo({ label: event.target.value, done: false });
	};

	const addNewTodo = (e) => {
		e.preventDefault();
		if (todo.label.trim().length !== 0) {
			updateTodos([...todoList, todo]);
			setTodo({ label: "", done: false });
		}
	};

	const remove = (number) => {
		const newTodoList = todoList.filter((item, index) => {
			return index != number;
		});
		updateTodos(newTodoList);
	};

	return (
		<div>
			<h1>todo</h1>
			<form onSubmit={addNewTodo}>
				<input
					onChange={handleChange}
					name="new-todo"
					type="text"
					value={todo.label}
					placeholder="Add a new todo"></input>
			</form>
			{loading && <div>loading tasks...</div>}
			<ul>
				{todoList.map((todoPrint, index) => {
					return (
						<li key={index}>
							{todoPrint.label}
							<button
								className="button-remove"
								onClick={() => remove(index)}>
								<i className="far fa-trash-alt"></i>
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Todo;
