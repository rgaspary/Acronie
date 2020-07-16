import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Emoji from './emoji';

function App() {

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function selectRandom(data, max = 100) {
    const randomNum = Math.floor(Math.random() * Math.floor(max));
    const chosenWord = data[randomNum].word;
    return capitalizeFirstLetter(chosenWord);
  }
  
  function renderResults(data) {
    // debugger;
    const listContainer = document.querySelector('.App-result__container');
    for (let key of Object.keys(data)) {
      const element = document.createElement('li');
      element.classList.add('App-result__item');
      element.innerText = data[key];
      listContainer.appendChild(element);
    }; 
  }

  function searchAcronym(e) {
    e.preventDefault();

    const apiUrl = 'https://api.datamuse.com/words?sp=';

    const resultContainer = document.querySelector('.App-result');
    resultContainer.innerHTML = '';
    resultContainer.classList.add('hidden');
    const listContainer = document.createElement('ul');
    listContainer.classList.add('App-result__container');
    resultContainer.appendChild(listContainer);
    const form = document.querySelector('.App-form');
    const formField = form.querySelector('#acronym');
    const word = formField.value;
    const solution = [];

    if (word && word.length > 0) {
      const acronymArray = word.split('');
      acronymArray.forEach((letter, key) => {
        fetch(`${apiUrl}${letter}*`)
        .then(res => res.json())
        .then(
          (result) => {
            const name = `result-${key}`;
            const selected = selectRandom(result);
            solution[name] = selected;
          },
          (error) => {
            console.error(error);
          }
        )
      });
      console.log(solution);
      setTimeout(() => { renderResults(solution); }, 100);
      resultContainer.classList.remove('hidden');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Acronie <Emoji symbol='🤔' label='thinking face'/></h1>
        <p>Acronie will tell you what your acronym stands for...</p>
        <p>Or at least try <Emoji symbol='😜' label='winking face with tongue' /></p>
      </header>
      <form className='App-form'>
        <label className='App-form__label' htmlFor='App-form__field'>Acronym:</label>
        <input type='text' className='App-form__field' id='acronym' name='acronym' />
        <button className='App-form__submit' onClick={searchAcronym}>What does it mean?</button>
      </form>
      <div className="App-result hidden"></div>
    </div>
  );
}

export default App;
