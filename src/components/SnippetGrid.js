import React from 'react'
import styled from 'styled-components'
import SnippetCard from './SnippetCard'

const SnippetGrid= () => {
	return <SnippetGridContainer>
		<SnippetCard originName="buliderbook/buildierbook" originLink="https://buildbook.com" routePath="server/post/router.post" fileName="router.js" snippet="router = new route();" language="javascript"	/>
		<SnippetCard originName="buliderbook/buildierbook" originLink="https://buildbook.com" routePath="server/post/router.post" fileName="router.js" snippet="router = new route();"	/>
		<SnippetCard originName="buliderbook/buildierbook" originLink="https://buildbook.com" routePath="server/post/router.post" fileName="router.js" snippet="router = new route();"	/>
		<SnippetCard originName="buliderbook/buildierbook" originLink="https://buildbook.com" routePath="server/post/router.post" fileName="router.js" snippet="router = new route();"	/>
	</SnippetGridContainer>

}


const SnippetGridContainer = styled.div`
	display: grid;
`;

export default SnippetGrid;