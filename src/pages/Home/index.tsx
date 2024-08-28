import { HandPalm, Play } from 'phosphor-react';
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from './styles';
import { useEffect, useState } from 'react';
import { Task } from '../../@types/task';
import { Countdown, NewTaskForm } from '../../components';

export const Home = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

	const isSubmitDisabled = !task;

	const handleCreateNewTask = (data: NewTaskFormData) => {
		console.log(data);
		const id = new Date().getTime().toString();
		const newTask: Task = {
			id,
			name: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		setTasks((t) => {
			return [...t, newTask];
		});
		setActiveTaskId(id);
		setAmountSecondsPassed(0);
		reset();
	};

	const handleStopTask = () => {
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

	useEffect(() => {
		if (activeTask) {
			document.title = `${minutesStr}:${secondsStr}`;
		}
	}, [minutesStr, secondsStr, activeTask]);

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewTask)}>
				<NewTaskForm />
				<Countdown minutes={minutesStr} seconds={secondsStr} />

				{activeTask ? (
					<StopCountdownButton type='button' onClick={handleStopTask}>
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton disabled={isSubmitDisabled} type='submit'>
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
};
