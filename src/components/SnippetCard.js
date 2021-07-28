import React from 'react'
import styled from 'styled-components'
import { CopyBlock, dracula } from "react-code-blocks";


const SnippetCard = ({ originName, originLink, fileName, routePath, snippet, language}) => {
	return <SnippetCardContainer>
		<div>
			<p>{originName}</p>
			<p>{fileName} : {routePath}</p>
		</div>
		<hr/>
		<CodeBlock>
		<CopyBlock
			text={snippet}
			language={language}
			theme={dracula}
			codeBlock={true}
		/></CodeBlock>
		<div>
			<button>Like</button>
		</div>
	</SnippetCardContainer>
}

const SnippetCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	overflow-x: auto;
	border: 1px solid gray;
	border-radius: 20px;
	margin: 1rem;
	padding: 1rem;
`;

const CodeBlock = styled.div`
	font-family: 'Fira Code', monospace;
`;
export default SnippetCard