function App() {
  return (
    <div className="lg:container lg:mx-auto">
      <div className="navbar bg-primary text-primary-content">
      <button className="btn btn-ghost text-xl">모버파</button>
    </div>

      <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
        <div className="card-body">
          <h2 className="card-title">1117</h2>
          <p>Click the button to watch on Jetflix app.</p>
        </div>
      </div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
        <div className="card-body">
          <h2 className="card-title">1150</h2>
          <p>Click the button to watch on Jetflix app.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
