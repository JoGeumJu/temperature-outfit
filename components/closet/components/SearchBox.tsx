import styled from '@emotion/styled';
import { customColor } from 'constants/index';
import { AiOutlineSearch } from 'react-icons/ai';
type Props = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
export const SearchBox = ({name, setName}: Props) => {
  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="검색"
        maxLength={20}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <AiOutlineSearch className="ImgSearch" />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .ImgSearch {
    position: absolute;
    top: 15px;
    left: 4px;
  }
`;

const SearchInput = styled.input`
  width: 80px;
  border: 1px solid ${customColor.gray};
  border-radius: 8px;
  height: 36px;
  padding: 0 16px 0 20px;

  text-align: center;
  :focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
