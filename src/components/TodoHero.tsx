import { Heading } from "@chakra-ui/react";

type TODOHeroProps = {
	todos_completed: number;
	total_todos: number;
};
function TODOHero({ todos_completed, total_todos }: TODOHeroProps) {
	return (
		<section className="todohero_section">
			<div>
				<Heading>Tasks Done</Heading>
			</div>
			<div>
				{todos_completed}/{total_todos}
			</div>
		</section>
	);
}
export default TODOHero;
