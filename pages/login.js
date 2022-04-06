import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <Container>
      <LoginContainer>
        <Logo src='/phone.png' />
        <Button onClick={signIn} variant='outlined'>
          Login with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: white;
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.8);
  background-color: whitesmoke;
`;

export default Login;
