import React from "react";
import styled from "styled-components";
import SnippetCard from "./SnippetCard";

const SnippetList = ({ snippets }) => {
  return (
    <div>
      <SnippetListContainer>
        {snippets.map((snippet, index) => {
          return (
            <SnippetCard
              key={index}
              docID={snippet.docID}
              id={snippet.id}
              originName={snippet.originName}
              originLink={snippet.originLink}
              routePath={snippet.routePath}
              fileName={snippet.fileName}
              snippet={snippet.snippet}
              language={snippet.language}
              isLiked={snippet.isLiked}
            />
          );
        })}
      </SnippetListContainer>
    </div>
  );
};

const SnippetListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  @media (min-width: 700px) {
    margin: 0 5rem;
  }

  @media (min-width: 900px) {
    margin: 0 15rem;
  }
`;

export default SnippetList;
