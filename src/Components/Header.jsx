const Header = () => {
  return (
    <header
      className="container-fluid"
      style={{ marginBottom: '6rem' }}
    >
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow  py-4 glass">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarTogglerDemo01"
          >
            <div>
              <a className="navbar-brand fw-bold ms-auto text-primary-emphasis text-gradient" to="/">
                WebName
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
