import React, { useState } from "react";
import styled from "styled-components";
import { CopyBlock, dracula } from "react-code-blocks";
import {
  IoLogoGithub,
  IoHeartOutline,
  IoHeartSharp,
  IoFolderOpenOutline,
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import firebase from "../firebase_utils";

const SnippetCard = ({
  id,
  docID,
  originName,
  originLink,
  fileName,
  routePath,
  snippet,
  language,
  isLiked,
}) => {
  const [toggleLike, setToggleLike] = useState(isLiked);
  const code = snippet.split("\\n").join("\n");

  const { currentUser } = useAuth();
  const history = useHistory();

  const onToggleHandler = async () => {
    if (currentUser) {
      if (!toggleLike)
        await firebase.firestore().collection(currentUser.uid).add({
          id,
          originLink,
          originName,
          fileName,
          routePath,
          snippet,
          isLiked: true,
        });
      setToggleLike((val) => !val);
    } else {
      history.push("/login");
    }
  };
  return (
    <SnippetCardContainer>
      <h1>
        # {id} {fileName}
      </h1>
      <OriginContainer>
        <IoLogoGithub style={{ marginRight: "5px" }} />
        <a href={originLink}>
          <p>{originName}</p>
        </a>
      </OriginContainer>
      <OriginContainer>
        <IoFolderOpenOutline style={{ marginRight: "5px" }} />
        <p>{routePath}</p>
      </OriginContainer>
      <CodeBlock>
        <CopyBlock text={code} language="javascript" theme={dracula} />
      </CodeBlock>
      <IconContainer onClick={onToggleHandler}>
        {toggleLike === false ? (
          <IoHeartOutline size="30px" />
        ) : (
          <IoHeartSharp size="30px" />
        )}
      </IconContainer>
    </SnippetCardContainer>
  );
};

const SnippetCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-x: auto;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 1rem;
  padding: 1rem;
  background-color: white;
`;

const CodeBlock = styled.div`
  font-family: "Fira Code", monospace;
`;

const IconContainer = styled.div`
  margin-top: 1rem;
  cursor: pointer;
`;

const OriginContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default SnippetCard;
