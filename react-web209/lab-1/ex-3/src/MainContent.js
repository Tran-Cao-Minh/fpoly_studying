function MainContent() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center", marginBottom: "22px" }}>
        Main Content
      </h1>
      <img
        style={{ textAlign: "center", height: "300px" }}
        src="./images/happy-programmers-day.jpg"
        alt="Happy Programmers Day"
      />
    </div>
  );
}

export default MainContent;
