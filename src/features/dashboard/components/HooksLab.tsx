import { useEffect, useState } from "react";

const HooksLab = () => {
  // let pageTitle = "Laboratoire Hooks";
  const [title, setTitle] = useState("Laboratoire Hooks");
  const changeTitle = () => {
    setTitle("Mon Hooks Lab");
    // console.log(pageTitle);
  };

  // pour le count avec increment
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((prev) => prev + 1);
    // setCount((prev) => prev + 1);
    // console.log(count);
  };

  useEffect(() => {
    console.log("use effect called");
  });

  // Chronometre
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return; // Guard clause
    const interval = setInterval(() => {
      // const + pas de else
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup simple
  }, [isRunning]); // useEffect uniquement si isRunning change

  // simulation call api
  // simulation call api
  interface User {
    name: string;
    age: number;
  }
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    // Simulation API
    setTimeout(() => {
      setUser({ name: "Jean", age: 25 });
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchUser();
  }, []); // useEffect uniquement au montage du composant

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <h5>{title}</h5>
      {/* affichage du state et mise à jour */}
      <div className="card">
        <div className="card-header bg-primary text-white">useState()</div>
        <div className="card-body">
          <p className="card-text">
            Utilisation du useState pour avoir un re rendu
          </p>
          <button
            className="btn btn-primary"
            onClick={changeTitle}
          >
            Change title page
          </button>
        </div>
      </div>

      {/* affichage du state et mise à jour */}
      <div className="card">
        <div className="card-header bg-primary text-white">useState()</div>
        <div className="card-body">
          <p className="card-text">{`compter : ${count}`}</p>
          <button
            className="btn btn-primary"
            onClick={increment}
          >
            Increment
          </button>
        </div>
      </div>

      {/* chronometre */}
      <h5>Un Chonomètre</h5>
      <div className="card">
        <div className="card-header bg-primary text-white">useState()</div>
        <div className="card-body">
          <p className="card-text">Chrono : {seconds}</p>
          <button
            className="btn btn-primary me-2"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => setSeconds(0)}
          >
            Reset
          </button>
        </div>
      </div>

      {/* simulation call api */}
      <h5>Simulation d'api call</h5>
      <div className="card">
        <div className="card-header bg-primary text-white">useState()</div>
        <div className="card-body">
          {loading ? (
            <p className="card-text">...chargement en cours</p>
          ) : (
            <p className="card-text">{user && user.name}</p>
          )}
        </div>
      </div>

      {/* exemple input controlé */}
      <h5>Simulation d'api call</h5>
      <div className="card">
        <div className="card-header bg-primary text-white">useState()</div>
        <div className="card-body">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tapez quelque chose..."
          />
          <p>Vous tapez: {inputValue}</p>
        </div>
      </div>
    </>
  );
};
export default HooksLab;
