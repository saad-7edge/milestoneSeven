import React, { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TODOHero from "./TodoHero";
import Form from "./Form";
import TODOList from "./TodoList";
import { Box } from "@chakra-ui/react";

const TodoScreen = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);
	const todos_completed = todos.filter(
		(todo) => todo.is_completed === true
	).length;
	const total_todos = todos.length;
	return (
		<Box padding={2} width="100%" justifyItems="center">
			<div className="wrapper">
			
				<TODOHero todos_completed={todos_completed} total_todos={total_todos} />
				<Form todos={todos} setTodos={setTodos} />
				<TODOList todos={todos} setTodos={setTodos} />
			</div>
		</Box>
	);
};

export default TodoScreen;
