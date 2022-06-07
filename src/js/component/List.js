import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Counter } from "./Counter.js";
import { Input } from "./Input.js";
import { Task } from "./Task.js";

export const List = () => {
	const [newTask, setNewTask] = useState("");
	const [listOfTasks, setListOfTasks] = useState([]);
	const createUser = useCallback(async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/caracas32",
				{
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([]), // JSON.parse
				}
			);
			if (response.status !== 200) {
				alert("fallo la creacion de usuario");
				return;
			}
			getToDos();
		} catch (error) {
			alert("esta caido el servidor!");
			return;
		}
	}, [getToDos]);
	const getToDos = useCallback(async () => {
		try {
			const response = await fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/caracas32"
			);
			if (response.status !== 200) {
				// crear usuario...
				if (response.status === 404) await createUser();
				return;
			}
			const body = await response.json();
			setListOfTasks(body);
		} catch (error) {
			alert("esta caido el servidor!");
			return;
		}
	}, []);
	useEffect(() => {
		getToDos();
	}, [getToDos]);
	return (
		<div className="container w-100 d-flex flex-column">
			<Input
				text=" What needs to be done?"
				value={newTask}
				setter={setNewTask}
				list={listOfTasks}
				setterList={setListOfTasks}
				getToDos={getToDos}
			/>
			{listOfTasks.length === 0 ? (
				<div
					className="fs-5"
					style={{ padding: "15px", color: "#4f4f4f" }}>
					{"No tasks, add a task..."}
				</div>
			) : (
				<Tasks
					list={listOfTasks}
					setterList={setListOfTasks}
					getToDos={getToDos}
				/>
			)}
			<Counter list={listOfTasks} />
		</div>
	);
};

// task = {
// 	label: string,
// 	done: boolean,
// }

const Tasks = (props) => {
	return (
		<div>
			{props.list.map((task, index) => {
				return (
					<Task
						task={task}
						key={index}
						id={index}
						setterList={props.setterList}
						list={props.list}
						getToDos={props.getToDos}
					/>
				);
			})}
		</div>
	);
};

Tasks.propTypes = {
	setterList: PropTypes.func,
	list: PropTypes.array,
};
