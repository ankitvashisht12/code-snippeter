import React from "react";
import styled from "styled-components";
import { IoGlobeOutline, IoHeartCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const PageHeader = ({ children }) => {
  return (
    <PageHeaderContainer>
      <NavContainer>
        <NavItem>
          <NavLink exact to="/" activeStyle={{ backgroundColor: "white" }}>
            <IoGlobeOutline style={{ marginRight: "5px" }} />
            <NavItemText>Browse</NavItemText>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/liked" activeStyle={{ backgroundColor: "white" }}>
            <IoHeartCircleOutline style={{ marginRight: "5px" }} />
            <NavItemText>Liked</NavItemText>
          </NavLink>
        </NavItem>
      </NavContainer>
      <div>{children}</div>
    </PageHeaderContainer>
  );
};

const PageHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 5px 10px;
  }
`;

const NavItemText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;
export default PageHeader;
