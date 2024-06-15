import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {

const [arrObj, setArrObj] = useState([])

const [state, setState] = useState(1000)

const [bonus, setBonus] = useState(1)
 
const [ secondsCreate, setSecondsCreate ] = useState(null);
const [ secondsDelete, setSecondsDelete] = useState(null);


useEffect(() => {
  if (secondsCreate > 0) {
    setTimeout(setSecondsCreate, 1, secondsCreate - 1);
    } else {
      setSecondsCreate(60)
      }
      }, [ secondsCreate ]);

    // console.log(secondsCreate)

  useEffect(() => {
    if (secondsDelete > 0) {
      setTimeout(setSecondsDelete, 100, secondsDelete - 1);
    } else {
      setSecondsDelete(60)
    }
  }, [ secondsDelete ]);

  // создает новый элемент когда секонд 0
  useEffect(() => {
    if (secondsCreate === 0) {
      const newObj = {
        id: Date.now(),
        x: `${Math.floor(Math.random() * (400 - 0 + 1) + 1)}px`,
        y: `${Math.floor(Math.random() * (400 - 0 + 1) + 1)}px`
      }
      setArrObj(prev => [...prev, newObj])
  console.log(arrObj)
    }
    }, [arrObj, secondsCreate])

    useEffect(() => {
      if (secondsDelete === 0) {
        if (arrObj.length > 150) {
          setArrObj([])
        }
      }
      }, [arrObj, secondsDelete])

    const clickBtn = useCallback((event, id) => {
      event.preventDefault()
      setState(prev => prev + bonus)
      setArrObj(prev => prev.filter((el) => el.id !== id))
    }, [bonus])

    const bonusTwo = useCallback(() => {
      setBonus(2)
    }, [])

    const bonusFive = useCallback(() => {
      setBonus(5)
    }, [])

    const bonus15 = useCallback(() => {
      setBonus(15)
    }, [])

  return (
    <div className="App">
      {state}
      <button onClick={bonusTwo}>Купить бонус 2</button>
      <button onClick={bonusFive}>Купить бонус 5</button>
      <button onClick={bonus15}>Купить бонус 15</button>
{arrObj?.map((el) => (
  <button onClick={(e) => clickBtn(e, el.id)} className='block' style={{left: el.x, top: el.y}}></button>
))}
    </div>
  );
}

export default App;


// 1 - рандомный размер шара
// 2 - рандомое количество шаров = массив объектов с координатами

