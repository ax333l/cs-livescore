import {useLocation} from "react-router-dom";
import React from 'react'
import axios from 'axios'

function App() {
  const search = useLocation().search;
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
        const { data } = await axios.get(`http://localhost:5000/score?link=https://steamcommunity.com/miniprofile/${miniprofilelink}`)
        if(data.body.error) {
          setError(JSON.stringify(data.body.error))
        }
        else{
          setError(null)
          setCurrentScore(data.body.score)
        }
      }, 5000);
    }
    getLink()
  }, []);
  if(error) {
    return (
      <div>{error}</div>
    )
  }
  if(!link) {
    return (
      <div>
        No link provided in URL query
      </div>
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
