function Navbar(Props) {
  return (
    <>
        <nav id="navbar">
            <div id="nav-logo">
                <img id="logo" src={Props.imgSrc} alt="Graviti Logo"/>
            </div>
        </nav>
    </>
  )
}

export default Navbar