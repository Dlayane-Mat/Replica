import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="South Africa" />
        <footer>
          This project was coded by{" "}
          <a href="https://github.com/Dlayane-Mat"> Dlayane Matjila</a> on{" "}
          <a href="https://github.com/Dlayane-Mat/Replica"> Github</a> and
          hosted by Netlify
        </footer>
      </div>
    </div>
  );
}
