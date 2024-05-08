function App() {
  return (
    <div className="lg:container lg:mx-auto">
      <div className="navbar bg-primary text-primary-content">
      <button className="btn btn-ghost text-xl">모버파</button>
    </div>

    <div className="card card-side bg-base-100 shadow-xl my-4">
      <figure className="w-28 ml-5">
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsEBqfpS-XFBbJpTPN6zZCAa8eOihFX0KZpIpa94BPOIKae7vTMde_Q3O-4rzFdTLFWLlX9GgrVWo8CO-yVj_bKmH0aJfJUEIjRwzvod6Smw3aL-wLnE7bAqwr808RLqvbZsyuNtHQ_w1e/s800/bus_character01_red.png" alt="bus image"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">1117</h2>
        <p>강변역 방면</p>
      </div>
      <div className="content-center p-2 bg-neutral rounded-box text-green-400">
        <span className="font-mono text-5xl">
          <span>15</span>
        </span>
        분
      </div>
    </div>

    </div>
  );
}

export default App;
