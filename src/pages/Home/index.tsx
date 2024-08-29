import { HandPalm, Play } from 'phosphor-react';
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from './styles';
import { createContext, useState } from 'react';
import { Task } from '../../@types/task';
import { Countdown, NewTaskForm } from '../../components';
import * as zod from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface TaskContextType {
	activeTask: Task | undefined;
	activeTaskId: string | null;
	tasks: Task[] | [];
	amountSecondsPassed: number;
	changedTimer: (totalSecondsElapsed: number) => void;
	changedTaskToFinished: () => void;
}

export const TaskContext = createContext({} as TaskContextType);

const newTaskValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'A tarefa precisa ser de no mínimo 5 minutos')
		.max(60, 'A tarefa precisa ser de no máximo 60 minutos'),
});

type NewTaskFormData = zod.infer<typeof newTaskValidationSchema>;

export const Home = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const activeTask = tasks.find((t) => t.id == activeTaskId);

	const newTaskForm = useForm<NewTaskFormData>({
		resolver: zodResolver(newTaskValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});

	const { handleSubmit, watch, reset } = newTaskForm;

	const task = watch('task');

	const isSubmitDisabled = !task;

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

	const changedTimer = (totalSecondsElapsed: number) => {
		setAmountSecondsPassed(totalSecondsElapsed);
	};

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

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewTask)}>
				<TaskContext.Provider
					value={{
						activeTask,
						activeTaskId,
						tasks,
						amountSecondsPassed,
						changedTimer,
						changedTaskToFinished,
					}}
				>
					<FormProvider {...newTaskForm}>
						<NewTaskForm />
					</FormProvider>
					<Countdown />
				</TaskContext.Provider>

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
