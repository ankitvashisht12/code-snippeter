import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import { useAuth } from "../context/AuthContext";
import SnippetList from "./SnippetList";
import firebase from "../firebase_utils";

const LikedSnippets = () => {
  const { currentUser } = useAuth();
  const [likedSnippets, setLikedSnippets] = useState([]);
  const [snippetHolder, setSnippetHolder] = useState([]);

  const fetchData = async () => {
    try {
      if (currentUser && currentUser.uid) {
        const db = firebase.firestore().collection(currentUser.uid);
        const data = await db.get();
        const snippetsData = data.docs
          .map((doc) => ({ docID: doc.id, ...doc.data() }))
          .filter((d) => d.docID !== "user");

        setLikedSnippets((prevSnippets) => [...prevSnippets, ...snippetsData]);

        setSnippetHolder([...likedSnippets, ...snippetsData]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const onSearchHandler = (e) => {
    if (e.target.value !== "") {
      const allSnippets = [...likedSnippets];
      const searchedSnippets = allSnippets.filter((doc) =>
        doc.fileName.toLowerCase().startsWith(e.target.value.toLowerCase())
      );

      setLikedSnippets(searchedSnippets);
    } else {
      setLikedSnippets(snippetHolder);
    }
  };

  return (
    <div>
      <PageHeader>
        <Input
          type="text"
          placeholder="🔍 Search By FileName"
          onChange={onSearchHandler}
        />
      </PageHeader>
      {currentUser === null ? (
        <CenterText>Please Login to see your liked Snippets</CenterText>
      ) : likedSnippets.length ? (
        <SnippetList snippets={likedSnippets} />
      ) : (
        <CenterText>No Liked Snippets here.</CenterText>
      )}
    </div>
  );
};
const Input = styled.input`
  border-radius: 5px;
  border: none;
  padding: 0.5rem 1rem;
`;

const CenterText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  margin: 1rem;
`;

export default LikedSnippets;
