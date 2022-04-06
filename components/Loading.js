import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        backgroundColor: "whitesmoke",
      }}
    >
      <div>
        <img
          style={{ marginBottom: 10 }}
          height={200}
          src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png'
        />
        <Circle size={60} />
      </div>
    </center>
  );
};

export default Loading;
