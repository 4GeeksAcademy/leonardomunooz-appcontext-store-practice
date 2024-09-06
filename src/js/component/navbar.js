import React, { useContext } from "react";
import { NavLink,Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store,actions} = useContext(Context)
	return (
		<nav className="navbar navbar-expand-md bg-body-tertiary navbar-dark bg-dark">
		<div className="container-fluid">
			<a className="navbar-brand" href="#">Navbar</a>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink
							className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"}
							aria-current="page"
							to="/">Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/todos">Todos</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/products">Products</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className={({ isActive }) => isActive ? "nav-link text-danger" : "nav-link"} to="/contact">Contact</NavLink>
					</li>
				</ul>
				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
						Favoritos {store.todos.length}
					</button>
					<ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
						<li><a className="dropdown-item active" href="#">Action</a></li>
						<li><a className="dropdown-item" href="#">Another action</a></li>
						<li><a className="dropdown-item" href="#">Something else here</a></li>
						<li><hr className="dropdown-divider" /></li>
						<li><a className="dropdown-item" href="#">Separated link</a></li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
	);
};
