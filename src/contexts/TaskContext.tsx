import {
	NewTaskFormData,
	Task,
	TaskContextProviderProps,
	TaskContextType,
} from '../@types/task';
import { createContext, useReducer, useState } from 'react';

import { tasksReducer } from '../reducers/tasks/reducer';
import {
	addNewTaskAction,
	endCurrentTaskAction,
	stopCurrentTaskAction,
} from '../reducers/tasks/actions';

export const TaskContext = createContext({} as TaskContextType);

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
	// Dispatch envia as ações para o reducer, é como falar o pedido ao pizzaiolo
	const [tasksState, dispatch] = useReducer(tasksReducer, {
		tasks: [],
		activeTaskId: '',
	});

	const { tasks, activeTaskId } = tasksState;
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const activeTask = tasks.find((t: Task) => t.id == activeTaskId);

	const createNewTask = (data: NewTaskFormData) => {
		console.log(data);
		const id = new Date().getTime().toString();
		const newTask: Task = {
			id,
			name: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		dispatch(addNewTaskAction(newTask));
		setAmountSecondsPassed(0);
	};

	const stopTask = () => {
		dispatch(stopCurrentTaskAction());
		setAmountSecondsPassed(0);
	};

	const changedTimer = (totalSecondsElapsed: number) => {
		setAmountSecondsPassed(totalSecondsElapsed);
	};

	const changedTaskToFinished = () => {
		dispatch(endCurrentTaskAction());
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				activeTask,
				activeTaskId,
				amountSecondsPassed,
				changedTimer,
				changedTaskToFinished,
				createNewTask,
				stopTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
