import { Todo } from "../types/todo";
import Item from "./TodoItem";

type TODOListProps = {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

function TODOList({ todos, setTodos }: TODOListProps) {
	return (
		<ol className="todo_list" >
			{todos && todos.length > 0 ? (
				todos?.map((item: Todo, index: number) => (
					<Item key={index} item={item} todos={todos} setTodos={setTodos} />
				))
			) : (
				<p>Seems lonely in here, what are you up to?</p>
			)}
		</ol>
	);
}
export default TODOList;
