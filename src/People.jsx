import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';


library.add(faShuttleSpace);

export function getCraft(people) {
  const CraftList = [...new Set(people.map((person) => person.craft))];
  return CraftList;
}

export function filterCraft(CraftType, people) {
  let filtredCraft = people.filter((person) => person.craft === CraftType);
  return filtredCraft;
}

function People() {
  const [people, setPeople] = useState([]);
  const [filtredCraft, setFiltredCraft] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState('all'); // State to track the selected craft

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch('http://api.open-notify.org/astros.json');
    const data = await response.json();
    setPeople(data.people);
  };

  useEffect(() => {
    if (people.length > 0) {
      setFiltredCraft(people); // Show all people by default
    }
  }, [people]);

  function handleCraft(e) {
    let typeCraft = e.target.value;
    setSelectedCraft(typeCraft); // Set the selected craft
    typeCraft !== 'all'
      ? setFiltredCraft(filterCraft(typeCraft, people))
      : setFiltredCraft(people); // Show all people if "all" is selected
  }

  return (
    <div className='mx-auto mt-4 px-6 max-w-screen-md'>
      <div className="p-4 mb-4 text-sm text-indigo-800 rounded-lg bg-indigo-50 dark:bg-gray-800 dark:text-indigo-400 shadow shadow-indigo-500/50 hover:dark-gray-700">
        <span className="text-white">Info:</span> This was a small project made by Darren Toner using React and Tailwind.
      </div>

      <div className='mb-5'>
  <button
    value="all"
    onClick={handleCraft}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-1 ${
      selectedCraft === 'all'
        ? 'bg-yellow-500 border-1 border-yellow-800 text-gray-900 shadow-lg shadow-yellow-500 hover:bg-yellow-600'
        : 'shadow shadow-yellow-500'
    }`}
  >
    All
  </button>

  {getCraft(people).map((craft, index) => (
    <button
      key={index}
      value={craft}
      onClick={handleCraft}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-1 ${
        selectedCraft === craft
          ? 'bg-yellow-500 border-1 border-yellow-800 text-gray-900 shadow-lg shadow-yellow-500 hover:bg-yellow-600'
          : 'shadow shadow-yellow-500'
      }`}
    >
      {craft}
    </button>
  ))}
</div>


      <ul>
        {filtredCraft.map((person, index) => (
          <li
            key={index}
            className='mx mx-auto mb-4 width-100 p-6 bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-indigo-500/50 hover:shadow-yellow-500'
            value={person.craft}
          >
            <FontAwesomeIcon icon="fa-solid fa-shuttle-space" />
            <p className='text--300/75 capitalize '>Craft: {person.craft} </p>
            <p className='text-gray-400'>Name: {person.name} </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default People;
