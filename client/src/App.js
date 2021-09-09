import {useLocation} from "react-router-dom";
import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const style = {
  'text-align': 'center',
  'font-size': '20px'
}

function App() {
  const search = useLocation().search;
  const history = useHistory()
  const link = new URLSearchParams(search).get('link');
  const [currentScore, setCurrentScore] = React.useState(["0", "0"])
  const [miniProfileLink, setMiniProfileLink] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    async function getLink() {
      const { data } = await axios.get(`http://localhost:5000/miniprofile?link=${link}`)
      setMiniProfileLink(data.body.link)
      const miniprofilelink = data.body.link
      setInterval(async () => {
        if(miniprofilelink) {
          const { data } = await axios.get(`http://localhost:5000/score?link=https://steamcommunity.com/miniprofile/${miniprofilelink}`)
          if(data.body.error) {
            setError(JSON.stringify(data.body.error))
          }
          else{
            setError(null)
            setCurrentScore(data.body.score)
          }
        }
        else {
          setError('Error to retrieve miniprofile link')
        }
      }, 5000);
    }
    getLink()
  }, []);
  const handleSubmit = (e) => {
    history.push('/?link=' + e.target.value)
  }
  if(!link) {
    return (
      <form onSubmit={handleSubmit} style={style}>
        <label>
          Вставьте ссылку:
          <input type="text" />
        </label>
        <input type="submit" value="Перейти" />
      </form>
    );
  }
  if(error) {
    return (
      <div>{error}</div>
    )
  }
  if(!miniProfileLink) {
    return (
      <div>
        Parsing link...
      </div>
    )
  }
  return (
    <div className="App">
      {miniProfileLink}
      <p>{currentScore[0]} : {currentScore[1]}</p>
    </div>
  );
}

export default App;
