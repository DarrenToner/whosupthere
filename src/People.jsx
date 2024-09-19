import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';
import SkeletonLoader from './SkeletonLoader';

library.add(faShuttleSpace);

export function getCraft(people) {
  if (!people || people.length === 0) {
    return []; // Return an empty array if people is not available yet
  }
  const CraftList = [...new Set(people.map((person) => person.craft))];
  return CraftList;
}

export function filterCraft(CraftType, people) {
  if (!people || people.length === 0) {
    return []; // Return an empty array if no people data is available
  }
  let filtredCraft = people.filter((person) => person.craft === CraftType);
  return filtredCraft;
}

function People() {
  const [people, setPeople] = useState([]);
  const [filtredCraft, setFiltredCraft] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const fallbackData = [
    {
      "craft": "ISS",
      "name": "Oleg Kononenko"
    },
    {
      "craft": "ISS",
      "name": "Nikolai Chub"
    },
    {
      "craft": "ISS",
      "name": "Tracy Caldwell Dyson"
    },
    {
      "craft": "ISS",
      "name": "Matthew Dominick"
    },
    {
      "craft": "ISS",
      "name": "Michael Barratt"
    },
    {
      "craft": "ISS",
      "name": "Jeanette Epps"
    },
    {
      "craft": "ISS",
      "name": "Alexander Grebenkin"
    },
    {
      "craft": "ISS",
      "name": "Butch Wilmore"
    },
    {
      "craft": "ISS",
      "name": "Sunita Williams"
    },
    {
      "craft": "Tiangong",
      "name": "Li Guangsu"
    },
    {
      "craft": "Tiangong",
      "name": "Li Cong"
    },
    {
      "craft": "Tiangong",
      "name": "Ye Guangfu"
    }
  ];

  const getData = async () => {
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=http://api.open-notify.org/astros.json`);
      const data = await response.json();

      if (data.contents) {
        const parsedData = JSON.parse(data.contents);
        if (parsedData && parsedData.people) {
          setPeople(parsedData.people);
        } else {
          setPeople(fallbackData); // Use fallback data in case of format issues
          setIsFallback(true);
        }
      } else {
        setPeople(fallbackData); // Use fallback data in case no contents
        setIsFallback(true);
      }
    } catch (error) {
      setPeople(fallbackData); // Use fallback data in case of error
      setIsFallback(true);
    }
    setLoading(false); // Set loading to false when data is loaded
  };

  useEffect(() => {
    if (people.length > 0) {
      setFiltredCraft(people);
    }
  }, [people]);

  function handleCraft(e) {
    let typeCraft = e.target.value;
    setSelectedCraft(typeCraft);
    typeCraft !== 'all'
      ? setFiltredCraft(filterCraft(typeCraft, people))
      : setFiltredCraft(people);
  }

  return (
    <div className='mx-auto mt-4 px-6 max-w-screen-md'>
      {isFallback && (
        <div className="bg-yellow-500 text-gray-900 px-4 py-3 rounded-lg mb-5" role="alert">
          <strong className="font-bold">API Error: </strong>
          <span className="block sm:inline">
            We encountered an issue while fetching the current list of people in space. You can try reloading later, or refer to the list below, which reflects data from September 19th, 2024.
          </span>
        </div>
      )}

      {/* Craft Selection Buttons */}
      <div className='mb-5'>
        <button
          value="all"
          onClick={handleCraft}
          className={`bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-full mr-1 ${selectedCraft === 'all'
              ? 'bg-yellow-500 border-1 border-yellow-800 text-gray-900 shadow-lg shadow-yellow-500/30 hover:bg-yellow-600'
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
            className={`bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full mr-1 ${selectedCraft === craft
                ? 'bg-yellow-500 border-1 border-yellow-800 text-gray-900 shadow-lg shadow-yellow-500/30 hover:bg-yellow-600'
                : 'shadow shadow-yellow-500'
              }`}
          >
            {craft}
          </button>
        ))}
      </div>

      {/* Skeleton Loaders when loading */}
      {loading ? (
        <ul>
          {[...Array(10)].map((_, index) => (
            <li key={index} className="mb-4">
              <SkeletonLoader width="w-full" height="h-16" borderRadius="rounded-lg" />
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {filtredCraft.map((person, index) => (
            <li
              key={index}
              className='mx mx-auto mb-4 w-full p-6 bg-indigo-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-indigo-500/50 hover:shadow-yellow-500'
              value={person.craft}
            >
              <FontAwesomeIcon icon="fa-solid fa-shuttle-space" />
              <p className='text--300/75 capitalize '>Craft: {person.craft} </p>
              <p className='text-gray-400'>Name: {person.name} </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default People;