import { HistoryContainer, HistoryList, Status } from "./styles";

export const History = () => {
  return <HistoryContainer>
    <h1>Meu histórico</h1>
    <HistoryList>
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>tarefa</td>
            <td>20 minutos</td>
            <td>Ha cerca de 2 meses</td>
            <td>
              <Status current="completed">Concluído</Status>
            </td>
          </tr><tr>
            <td>tarefa</td>
            <td>20 minutos</td>
            <td>Ha cerca de 2 meses</td>
            <td>
              <Status current="interrupted">Interrompido</Status>
            </td>

          </tr>
          <tr>
            <td>tarefa</td>
            <td>20 minutos</td>
            <td>Ha cerca de 2 meses</td>
            <td>
              <Status current="pending">Em andamento</Status>
            </td>
          </tr>

        </tbody>
      </table>
    </HistoryList>
  </HistoryContainer>;
};

