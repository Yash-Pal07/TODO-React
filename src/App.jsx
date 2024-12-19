import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";


const App = () => {
  const [alluser, setalluser] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [username, setusername] = useState("");
  const [completed, setcompleted] = useState(() => {
    const savedCompleted = localStorage.getItem("completed");
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(alluser));
  }, [alluser]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  function submithandleer(e) {
    e.preventDefault();
    setalluser([...alluser,username.trim()]);
    setusername("");
  }

  const deleteHandler = (itemToDelete) => {
    setalluser(alluser.filter((item) => item !== itemToDelete));
    setcompleted(completed.filter((item) => item !== itemToDelete));
  };

  const handleCheckbox = (item, isChecked) => {
    if (isChecked) {
      setcompleted([...completed, item]);
    } else {
      setcompleted(completed.filter((completedItem) => completedItem !== item));
    }
  };

  return (
    <div className="container">
      <h1 className="text-5xl font-bold mb-[2vw]">TODO LIST</h1>
      <div className="flex justify-between items-center gap-[5vw] mb-[2vw]">
        <h2 className="text-2xl font-semibold">
          Total Task: {alluser.length}
        </h2>
        <h2 className="text-2xl font-semibold">
          Completed Task: {completed.length}
        </h2>
        <h2 className="text-2xl font-semibold">
          Pending Task: {alluser.length - completed.length}
        </h2>
      </div>
      <form onSubmit={submithandleer}>
        <input
          onChange={(e) => setusername(e.target.value)}
          value={username}
          className="w-[28vw]"
          type="text"
          placeholder="Enter the task"
        />
        <button type="submit" className="w-[7vw]">Add++</button>
      </form>
      <div className="list">
        {alluser.map((item) => (
          <div key={nanoid()} className="list-item">
            <h1>
              <input
                className="checkbox"
                type="checkbox"
                checked={completed.includes(item)}
                
                //cheks agr ki item pehle se completed mein hai ya nahi
                onChange={(e) => handleCheckbox(item, e.target.checked)}
              />
              {item}
            </h1>
            <button
              className="delete-btn"
              onClick={() => deleteHandler(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
