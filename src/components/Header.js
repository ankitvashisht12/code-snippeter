import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import firebase from "../firebase_utils";

const Header = () => {
  const { currentUser } = useAuth();
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo>Code Snippeter</Logo>
      </Link>
      {currentUser ? (
        <Link to="/">
          <Button onClick={() => firebase.auth().signOut()}>Logout</Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 4rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Logo = styled.p`
  font-family: "Teko", sans-serif;
  font-size: 1.2rem;
`;

const Button = styled.button`
  padding: 5px;
  cursor: pointer;
`;

export default Header;
