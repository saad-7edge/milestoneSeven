import { testUser } from "../db/users";
import profile from "./../assets/segun_adebayo.jpg";
const Dashboard = () => {
	return (
		<div className="dashboard">
			<h2 className="heading">User Management</h2>
			<table className="user-table">
				<thead>
					<tr>
						<th>Avatar</th>
						<th>Name</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{testUser.map((user) => (
						<tr key={user.id}>
							<td>
								<img
									src={user.profile ? user.profile : profile}
									alt={user.email}
									className="avatar"
								/>
							</td>
							<td>{user.email}</td>
							<td className={`role ${user.role.toLowerCase()}`}>{user.role}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
