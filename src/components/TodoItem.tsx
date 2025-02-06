import { useEffect, useRef, useState } from "react";

function Item({ item, todos, setTodos }) {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const completeTodo = () => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === item.id
					? { ...todo, is_completed: !todo.is_completed }
					: todo
			)
		);
		// Update localStorage after marking todo as completed
		const updatedTodos = JSON.stringify(todos);
		localStorage.setItem("todos", updatedTodos);
	};
	const handleEdit = () => {
		setEditing(true);
	};
	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
			// position the cursor at the end of the text
			inputRef.current.setSelectionRange(
				inputRef.current.value.length,
				inputRef.current.value.length
			);
		}
	}, [editing]);
	const handleInpuSubmit = (event) => {
		event.preventDefault();
		// Update localStorage after editing todo
		const updatedTodos = JSON.stringify(todos);
		localStorage.setItem("todos", updatedTodos);
		setEditing(false);
	};
	const handleInputBlur = () => {
		// Update localStorage after editing todo
		const updatedTodos = JSON.stringify(todos);
		localStorage.setItem("todos", updatedTodos);
		setEditing(false);
	};
	const handleInputChange = (e) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === item.id ? { ...todo, title: e.target.value } : todo
			)
		);
	};
	const handleDelete = () => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
		// Update localStorage after deleting todo
		const updatedTodos = JSON.stringify(
			todos.filter((todo) => todo.id !== item.id)
		);
		localStorage.setItem("todos", updatedTodos);
	};
	return (
		<li id={item?.id} className="todo_item">
			{editing ? (
				<form className="edit-form" onSubmit={handleInpuSubmit}>
					<label htmlFor="edit-todo">
						<input
							ref={inputRef}
							type="text"
							name="edit-todo"
							id="edit-todo"
							defaultValue={item?.title}
							onBlur={handleInputBlur}
							onChange={handleInputChange}
						/>
					</label>
				</form>
			) : (
				<>
					<button className="todo_items_left" onClick={completeTodo}>
						<svg fill={item.is_completed ? "#22C55E" : "#c2b39a"}>
							<circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
						</svg>
						<p className={item.is_completed ? "completed" : ""}>
							{item?.title}
						</p>
					</button>
					<div className="todo_items_right">
						<button onClick={handleEdit}>
							<span className="visually-hidden">Edit</span>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
									stroke="#88ab33"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
									stroke="#88ab33"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button onClick={handleDelete}>
							<span className="visually-hidden">Delete</span>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 6H5H21"
									stroke="#88ab33"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
									stroke="#88ab33"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</>
			)}
		</li>
	);
}

export default Item;
