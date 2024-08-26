import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from 'react';
import { Task } from '../../@types/task';
import { differenceInSeconds } from 'date-fns';

const newTaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'A tarefa precisa ser de no mínimo 5 minutos')
    .max(60, 'A tarefa precisa ser de no máximo 60 minutos'),
});

type NewTaskFormData = zod.infer<typeof newTaskValidationSchema>;

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const task = watch('task');
  const activeTask = tasks.find((t) => t.id == activeTaskId);

  useEffect(() => {
    let interval: number;

    if (activeTask) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeTask.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeTask]);

  const isSubmitDisabled = !task;
  const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
  const currentSeconds = activeTask ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutesStr = String(minutesAmount).padStart(2, '0');
  const secondsStr = String(secondsAmount).padStart(2, '0');

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
    const newTasks = tasks.map(item =>
      item.id != activeTaskId ? item : {
        ...item,
        interruptedDate: new Date()
      }
    )
    setTasks(newTasks)
    setAmountSecondsPassed(0)
    setActiveTaskId(null)
  }

  useEffect(() => {
    if (activeTask) {
      document.title = `${minutesStr}:${secondsStr}`;
    }
  }, [minutesStr, secondsStr, activeTask]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            id='task'
            placeholder='Nome da tarefa ...'
            list='task-suggestions'
            {...register('task')}
            disabled={activeTask}
          />
          <datalist id='task-suggestions'>
            <option value='projeto 1' />
            <option value='projeto 2' />
            <option value='projeto 3' />
            <option value='Roteiro' />
          </datalist>
          <label htmlFor='minutesAmount'>durante</label>
          <MinutesAmountInput
            id='minutesAmount'
            type='number'
            placeholder='00'
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
            disabled={activeTask}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesStr[0]}</span>
          <span>{minutesStr[1]}</span>
          <Separator>:</Separator>
          <span>{secondsStr[0]}</span>
          <span>{secondsStr[1]}</span>
        </CountdownContainer>
        {
          activeTask ? <StopCountdownButton
            type='button'
            onClick={handleStopTask}
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton> : <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} />
            Começar
          </StartCountdownButton>

        }
      </form>
    </HomeContainer>
  );
};
