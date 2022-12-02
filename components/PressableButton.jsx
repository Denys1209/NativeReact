import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 40px;
  width: 280px;
  height: 50px;
  padding: 12px;
  border-radius: 20px;
  background-color: ${props => props.bgColor};
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
export const PressableButton = ({ onPress, bgColor, title }) => (
  <ButtonContainer onPress={onPress} bgColor={bgColor}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
