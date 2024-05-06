function App() {
  return (
    <div className="lg:container lg:mx-auto">
      <div className="navbar bg-primary text-primary-content">
      <button className="btn btn-ghost text-xl">모버파</button>
    </div>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src="/" alt="Movie"/></figure>
        <div className="card-body">
          <h2 className="card-title">1117</h2>
          <p>설명</p>
        </div>
      </div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src="/" alt="Movie"/></figure>
        <div className="card-body">
          <h2 className="card-title">1150</h2>
          <p>설명</p>
        </div>
      </div>
    </div>
  );
}

export default App;
