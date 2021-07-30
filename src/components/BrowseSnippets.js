import React, { useEffect, useState } from "react";
import SnippetList from "./SnippetList";
import firebase from "../firebase_utils";
import styled from "styled-components";
import PageHeader from "./PageHeader";

const BrowseSnippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [snippetHolder, setSnippetHolder] = useState([]);
  const [latestDoc, setLatestDoc] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const fetchData = async () => {
    try {
      const db = firebase
        .firestore()
        .collection("snippet")
        .orderBy("id")
        .startAfter(latestDoc ? latestDoc.id : 0)
        .limit(10);
      const data = await db.get();
      const snippetsData = data.docs.map((doc) => ({
        docID: doc.id,
        ...doc.data(),
      }));

      setSnippetHolder([...snippets, ...snippetsData]);
      setSnippets((prevSnippets) => [...prevSnippets, ...snippetsData]);
      setLatestDoc(snippetsData[snippetsData.length - 1]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearchHandler = (e) => {
    if (e.target.value !== "") {
      const allSnippets = [...snippets];
      const searchedSnippets = allSnippets.filter((doc) =>
        doc.fileName.toLowerCase().startsWith(e.target.value.toLowerCase())
      );

      console.log({
        val: e.target.value,
        searchedSnippets,
        snippetHolder,
        allSnippets,
      });
      setSnippets(searchedSnippets);
      setShowLoadMore(false);
    } else {
      setSnippets(snippetHolder);
      setShowLoadMore(true);
    }
  };

  return (
    <div>
      <PageHeader>
        <Input
          type="text"
          placeholder="🔍 Search By Filename"
          onChange={(e) => onSearchHandler(e)}
        />
      </PageHeader>
      <SnippetList snippets={snippets} />
      {showLoadMore ? (
        <LoadMoreContainer>
          {latestDoc === undefined ? (
            "No More Items to Load"
          ) : (
            <LoadMoreButton onClick={fetchData}>Load More</LoadMoreButton>
          )}
        </LoadMoreContainer>
      ) : null}
    </div>
  );
};

const LoadMoreContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 10px;
  text-align: center;
  background-color: white;
`;

const LoadMoreButton = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: teal;
  border-radius: 5px;
  color: white;
`;
const Input = styled.input`
  border-radius: 5px;
  border: none;
  padding: 0.5rem 1rem;
`;
export default BrowseSnippets;
