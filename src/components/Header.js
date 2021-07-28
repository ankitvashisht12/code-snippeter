import styled from 'styled-components'

const Header = () => {
	return <HeaderContainer>
		<Logo>Code Snippeter</Logo>
		<SearchBox placeholder="Search Snippet by filename" type="text" />
		<Button>Login</Button>
	</HeaderContainer>
}

const HeaderContainer = styled.div`
	width: 100%;
	height: 4rem;
	padding: 1rem;
	display: flex;
	align-items: center;
`;

const Logo = styled.p`
	font-family: 'Teko', sans-serif;
	font-size: 1.2rem;
`;

const SearchBox = styled.input`
	flex: 1;
	border: 1px solid gray;
	border-radius: 5px;
	margin: 1rem;
`
const Button = styled.button`
	padding: 20px;
`;
export default Header;