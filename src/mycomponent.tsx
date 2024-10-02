import React, { useEffect, useState } from 'react';

const MyComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false); // Stop loading in case of an error
        });
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

export default MyComponent;