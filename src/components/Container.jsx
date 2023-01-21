import Display from "./Display";

function Container() {
  return (
    <>
    {/* {Heading} */}
      <div id="small-heading">
        <span>
          Let's calculate <span style={{ fontWeight: 600 }}>distance</span> from
          Google maps
        </span>
      </div>

      {/* {Main section} */}
      <div id="div-grid">
        <Display />
      </div>
    </>
  );
}

export default Container;
