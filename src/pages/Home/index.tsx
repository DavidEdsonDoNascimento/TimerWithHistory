import { HandPalm, Play } from 'phosphor-react';
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from './styles';
import { useContext } from 'react';
import { Countdown, NewTaskForm } from '../../components';
import * as zod from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskContext } from '../../contexts/TaskContext';

const newTaskValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'A tarefa precisa ser de no mínimo 5 minutos')
		.max(60, 'A tarefa precisa ser de no máximo 60 minutos'),
});

type NewTaskFormData = zod.infer<typeof newTaskValidationSchema>;

export const Home = () => {
	const { activeTask, createNewTask, stopTask } = useContext(TaskContext);
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

	const handleCreateNewTask = (data: NewTaskFormData) => {
		createNewTask(data);
		reset();
	};

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewTask)}>
				<FormProvider {...newTaskForm}>
					<NewTaskForm />
				</FormProvider>
				<Countdown />
				{activeTask ? (
					<StopCountdownButton type='button' onClick={stopTask}>
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
