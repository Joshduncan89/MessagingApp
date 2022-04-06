import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@mui/material";
import { db, auth } from "../firebase";

import { addDoc, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Chat = ({ id, users }) => {
  const colors = [
    "gray",
    "green",
    "blueviolet",
    "aquamarine",
    "teal",
    "purple",
    "slate",
  ];
  const [user] = useAuthState(auth);
  const [chatSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "!=", user.email))
  );

  const recipient = chatSnapshot?.docs?.[0]?.data();

  console.log(user);
  console.log(users[0]);
  console.log(users[1]);
  const randomColor = () => {
    const number = Math.floor(Math.random() * 10);
    if (number > colors.length) {
      return colors[number - colors.length];
    }
    return colors[number];
  };

  return (
    <Container>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar style={{ backgroundColor: `${randomColor()}` }}>
          {users[1][0]}
        </UserAvatar>
      )}
      <UserEmail>{users[1]}</UserEmail>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  word-break: break-word;
  padding: 10px;
  cursor: pointer;
  align-items: center;
`;

const UserEmail = styled.p`
  padding-left: 5px;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
`;
