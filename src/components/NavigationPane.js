import React from 'react'
import styled from 'styled-components'

const NavigationPane = () => {
	return <NavigationPaneContainer>
		<button>Previous</button>
		<button>Next</button>
	</NavigationPaneContainer>
}

const NavigationPaneContainer = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 1rem;
`;
export default NavigationPane