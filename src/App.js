import './App.css';
import { useEffect, useState } from 'react';
import { Nutrition } from './Nutrition';
import { LoaderPage } from './LoaderPage';
import video from './video.mp4';



function App() {

  const APP_ID = '67ecb000';
  const APP_KEY = '5464931339309136cd14dc7ea164e730';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details';

  const [mySearch, setMySearch] = useState();
  const[wordSubmitted, setWordSubmitted] = useState('');
  const[myNutrition, setMyNutrition] = useState();
  const[stateLoader, setStateLoader] = useState(false);

  const fetchData = async(ingr) => {
    setStateLoader(true);
    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ingr: ingr})
    })
    if(response.ok){
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
      console.log(data);
    } else {
      setStateLoader(false);
      alert('ingredients entered incorrectly' );
    }
  }

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    if(wordSubmitted !==''){
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (
    <div>
      {stateLoader && <LoaderPage/>}
<div className='container'>
    <h1>Nutrition Analysis</h1>
</div>
<video autoPlay muted loop>
  <source  src={video} type='video/mp4'/>
</video>
<form onSubmit={ finalSearch } className='container'> 
  <input className='input' onChange={ myRecipeSearch } type="text" placeholder='Search...' />
  <button className='btn'> Search </button>
</form>

<div >
  {
    myNutrition && <div className='list'><p className='li'><b> { myNutrition.calories } kcal</b></p> </div>
  }
  {
    myNutrition && Object.values( myNutrition.totalNutrients ).map(({ label, quantity, unit }) =>
    <Nutrition label = { label } quantity = { quantity } unit = { unit } />
    )
  }
</div>

    </div>
  );
}

export default App;
