import { Task } from '../@types/task';
import { createContext, useState } from 'react';

interface TaskContextType {
	tasks: Task[] | [];
	activeTask: Task | undefined;
	activeTaskId: string | null;
	amountSecondsPassed: number;
	changedTimer: (totalSecondsElapsed: number) => void;
	changedTaskToFinished: () => void;
	createNewTask: (data: NewTaskFormData) => void;
	stopTask: () => void;
}

export const TaskContext = createContext({} as TaskContextType);

type NewTaskFormData = {
	task: string;
	minutesAmount: number;
};

type TaskContextProviderProps = {
	children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const activeTask = tasks.find((t) => t.id == activeTaskId);

	const createNewTask = (data: NewTaskFormData) => {
		console.log(data);
		const id = new Date().getTime().toString();
		const newTask: Task = {
			id,
			name: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		applyChangesInTasks(id, newTask);
	};

	const stopTask = () => {
		setTasks((state) =>
			state.map((item) =>
				item.id != activeTaskId
					? item
					: {
							...item,
							interruptedDate: new Date(),
					  }
			)
		);
		setAmountSecondsPassed(0);
		setActiveTaskId(null);
	};

	const applyChangesInTasks = (id: string, task: Task): void => {
		setTasks((state) => {
			return [...state, task];
		});
		setActiveTaskId(id);
		setAmountSecondsPassed(0);
	};

	const changedTimer = (totalSecondsElapsed: number) => {
		setAmountSecondsPassed(totalSecondsElapsed);
	};

	const changedTaskToFinished = () => {
		setTasks((state) =>
			state.map((item) =>
				item.id != activeTaskId
					? item
					: {
							...item,
							finishedDate: new Date(),
					  }
			)
		);
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
