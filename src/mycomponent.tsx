import React, { useEffect, useState } from 'react';

const JokeComponent: React.FC = () => {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to simulate data fetching with a delay
    const fetchJoke = () => {
      return new Promise((resolve, reject) => {
        // Simulate an artificial delay for the loader (e.g., 2 seconds)
        setTimeout(() => {
          fetch('https://official-joke-api.appspot.com/random_joke')
            .then((response) => {
              if (!response.ok) {
                reject('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        }, 2000); // Delay of 2 seconds
      });
    };

    fetchJoke()
      .then((data: any) => {
        setJoke(data);
        setLoading(false); // Stop loading after delay and fetching data
      })
      .catch((error) => {
        setError('Failed to load joke');
        setLoading(false); // Stop loading in case of error after delay
      });
  }, []); // Empty dependency array to run only on component mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{joke?.setup}</h1>
      <p>{joke?.punchline}</p>
    </div>
  );
};

export default JokeComponent;
