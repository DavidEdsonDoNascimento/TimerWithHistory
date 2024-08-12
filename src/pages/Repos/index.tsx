import { useEffect, useState } from "react";

export const Repos = () => {

  const [repos, setRepos] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('')

  const listFormatted = repos.filter(item => item.name.includes(filter))

  useEffect(() => {
    fetch('https://api.github.com/users/DavidEdsonDoNascimento/repos')
      .then(res => res.json())
      .then(data => {
        setRepos(data)
      })
  }, [])

  return (
    <div>
      <input
        type="text"
        onChange={e => setFilter(e.target.value)}
        value={filter}
      />

      <table>
        {
          listFormatted.length ?
            listFormatted.map(item => {
              return <tr>
                {item.name}
              </tr>
            }) :
            repos.map(item => {
              return <tr>
                {item.name}
              </tr>
            })
        }
      </table>
    </div>
  );
}
