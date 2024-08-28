import { createContext, useContext, useState } from 'react';

const TaskContext = createContext({} as any);

const CountDown = () => {
	const { activeTask, setActiveTask } = useContext(TaskContext);

	return <h1>Countdown {activeTask ? 'tarefa ativa' : 'tarefa inativa'}</h1>;
};

const NewCycleForm = () => {
	const { activeTask, setActiveTask } = useContext(TaskContext);
	return (
		<div>
			<h1>New Cycle Form {activeTask ? 'doida' : 'laga'}</h1>
			<button type='button' onClick={() => setActiveTask(!activeTask)}>
				Toggle
			</button>
		</div>
	);
};

export const Teste = () => {
	const [activeTask, setActiveTask] = useState({ status: false });

	return (
		<TaskContext.Provider
			value={{
				activeTask,
				setActiveTask,
			}}
		>
			<NewCycleForm />
			<CountDown />
		</TaskContext.Provider>
	);
};
