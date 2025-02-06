// src/components/Form.jsx

import { Todo } from "../types/todo";
import { toaster } from "./ui/toaster";

type FormProps = {
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	todos: Todo[];
};

function Form({ todos, setTodos }: FormProps) {
	const handleSubmit = (event) => {
		event.preventDefault();
		const value = event.target.todo.value;
		const newTodo = {
			title: value,
			id: self.crypto.randomUUID(),
			is_completed: false,
		};
		// Update todo state
		setTodos((prevTodos) => [...prevTodos, newTodo]);
		// Store updated todo list in local storage
		const updatedTodoList = JSON.stringify([...todos, newTodo]);
		localStorage.setItem("todos", updatedTodoList);
		toaster.create({
			title: "Successfully created",
			type: "success",
			duration: 1000,
		});
		event.target.reset();
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<label htmlFor="todo">
				<input
					type="text"
					name="todo"
					id="todo"
					placeholder="Write your next task"
				/>
			</label>
			<button>
				<span className="visually-hidden">Submit</span>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 4V20M4 12H20"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</form>
	);
}
export default Form;
