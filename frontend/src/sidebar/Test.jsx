import React, { useEffect, useState } from "react";

function Test() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://myapp.onrender.com/api/test/")
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <h1>{data.message}</h1>;
}

export default Test;
