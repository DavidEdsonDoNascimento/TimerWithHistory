import { Play } from "phosphor-react"
import { useForm } from "react-hook-form"
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from "./styles"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from 'zod'
import { useState } from "react"
import { Task } from "../../@types/task"

const newTaskValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'A tarefa precisa ser de no mínimo 5 minutos')
    .max(60, 'A tarefa precisa ser de no máximo 60 minutors')
})

type NewTaskFormData = zod.infer<typeof newTaskValidationSchema>

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset
  } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')

  const isSubmitDisabled = !task || isNaN(minutesAmount)
  const activeTask = tasks.find(t => t.id == activeTaskId)

  const handleCreateNewTask = (data: NewTaskFormData) => {
    console.log(data)
    const id = new Date().getTime().toString()
    const newTask = {
      id,
      name: data.task,
      minutesAmount: data.minutesAmount
    }
    setTasks(t => {
      return [
        ...t,
        newTask
      ]
    })
    setActiveTaskId(id)
    console.log(tasks)
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>

        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Nome da tarefa ..."
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="Roteiro" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true
            })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
