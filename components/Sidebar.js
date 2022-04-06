import { Avatar, IconButton, Button } from "@mui/material";
import Chat from "./Chat";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";

import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  const [chatSnapshot] = useCollection(userChatRef);

  const startChat = () => {
    const input = prompt("Enter email to chat");
    if (!input) {
      return null;
    }
    if (
      EmailValidator.validate(input) &&
      chatAlreadyExists(input) &&
      input !== user.email
    ) {
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipient) => {
    let arr = [];
    chatSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => {
        if (user === recipient) {
          arr.push(recipient);
        }
      })
    );
    if (arr.length == 0) return true;
  };
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => signOut(auth)} />
        <p>{user.email}</p>
        <IconsContainer>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search' />
      </Search>
      <SidebarButton onClick={startChat}>Start a new Chat</SidebarButton>
      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} users={chat.data().users} id={chat.id} />
      ))}
    </Container>
  );
};

export default Sidebar;
const IconsContainer = styled.div``;
const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const Search = styled.div`
  display: flex;
`;
const Container = styled.div``;
const SearchInput = styled.input``;
const Header = styled.div`
  display: flex;
  z-index: 1;
  justify-content: space-between;
  top: 0;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  height: 80px;
  padding: 15px;
  position: sticky;
  align-items: center;
`;
const UserAvatar = styled(Avatar)`
  background-color: "steelblue";
  cursor: pointer;
`;
