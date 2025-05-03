import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledHomeButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #4a90e2;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #357abd;
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

    .home-icon {
      animation: ${rotate} 1s linear;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
`;

function HomeButton() {
  const navigate = useNavigate();

  return (
    <StyledHomeButton onClick={() => navigate("/")} aria-label="返回首頁">
      <span className="home-icon" role="img" aria-hidden="true">
        🏠
      </span>
    </StyledHomeButton>
  );
}

export default HomeButton;
