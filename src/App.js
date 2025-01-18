import './App.css';
import Card from './components/Card';
import bg from "./assets/bg-min.jpg";
import boy from "./assets/boy-4-min.jpg";
import girl from "./assets/girl-3-min.jpg";
import cat from "./assets/cat-1-min.jpg";
import dog from "./assets/dog-2-min.jpg";

const cardBgs = [boy, girl, cat, dog];
function App() {
  let deckSize = [4, 6, 8];
  let currentDeckSize = null;
  function generateCard(n) {
    currentDeckSize = n;
    let map = {};
    let cards = [];
    let mapFrontCardBg = {};
    let selectedFrontBgIdx = [];

    for (let i = 1; i <= n / 2; i++) {
      map[i] = 2;
    }
    for (let i = 1; i <= n; i++) {
      cards.push(<Card key={i} value={generateRandomVal()} frontBg={(value) => { return setFrontCardBg(value) }} id={`card-${i}`} click={handleCardClick} />);
    }

    function generateRandomVal() {
      let randomNum = 0;
      while (map[randomNum] === undefined) {
        randomNum = Math.floor(Math.random() * (n / 2) + 1);
      }
      map[randomNum] -= 1;
      if (map[randomNum] <= 0) delete map[randomNum];
      return randomNum;
    }

    function setFrontCardBg(value) {
      let curBg = null;
      if (mapFrontCardBg[value] === undefined) {
        let randomIdx = Math.floor(Math.random() * cardBgs.length);
        while (selectedFrontBgIdx.includes(randomIdx)) {
          randomIdx = Math.floor(Math.random() * cardBgs.length);
        }
        selectedFrontBgIdx.push(randomIdx);
        mapFrontCardBg[value] = randomIdx;
      }
      curBg = cardBgs[mapFrontCardBg[value]];
      return curBg;
    }
    return cards;
  }

  let prevCard = [];
  let matchedCards = [];
  let openCardCount = 0;
  function handleCardClick(e, id, value, setStayClicked) {
    if (!matchedCards.includes(value) && id !== prevCard[2] && openCardCount <= 1) {
      openCardCount++;
      setStayClicked(true);
      if (prevCard.length <= 0) {
        prevCard.push(value);
        prevCard.push(setStayClicked);
        prevCard.push(id);
      } else {
        if (prevCard[0] === value) {
          matchedCards.push(value);
          prevCard = [];
          openCardCount = 0;
          if (currentDeckSize / 2 === matchedCards.length) {
            setTimeout(() => {
              window.alert("you've won!!!")
              window.location.reload();
            }, 1000);
          }
        } else {
          setTimeout(() => {
            setStayClicked(false);
            if (prevCard && prevCard[1]) {
              prevCard[1](false);
            }
            openCardCount = 0;
            prevCard = [];
          }, 1500);
        }
      }
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="card-container">
        {
          generateCard(deckSize[Math.floor(Math.random() * deckSize.length)])
        }
      </div>
    </div>
  );
}

export default App;
