import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { TypoGraphy, SelectBox } from 'components/common';
import { customColor } from 'constants/index';
import { GrLocation } from 'react-icons/Gr';
import { signOut } from 'next-auth/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { locations, userState } from 'recoil/atom';
import { userApi } from 'api';

export const MyPage: React.FC = () => {
  const [{ name, locationId }, setUser] = useRecoilState(userState);
  const allLocations = useRecoilValue(locations);

  const changeUserLocations = async (e: any) => {
    try {
      await userApi.changeUserLocation({ locationId: Number(e) });
      setUser({ name, locationId: Number(e) });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <NameInfo>
        <TypoGraphy type="h2" color={customColor.brandColor3} fontWeight="bold">
          {name}
        </TypoGraphy>
        <TypoGraphy type="h4" color={customColor.brandColor4} fontWeight="bold">
          님
        </TypoGraphy>
      </NameInfo>

      <LocationWrapper>
        <GrLocation size={28} />
        <SelectBox
          value={locationId.toString()}
          categoryChange={changeUserLocations}
          width={80}
          dataArray={allLocations}
          label="지역"
        />
      </LocationWrapper>

      <TypoGraphy type="sm1">사는 지역을 선택해주세요</TypoGraphy>

      <Footer>
        <LogOut onClick={() => signOut()}>
          <TypoGraphy
            type="body1"
            color={customColor.brandColor5}
            fontWeight="bold">
            로그아웃
          </TypoGraphy>{' '}
        </LogOut>
        <AccountDeletion>
          <TypoGraphy
            type="body1"
            color={customColor.brandColor5}
            fontWeight="bold">
            회원탈퇴
          </TypoGraphy>
        </AccountDeletion>
      </Footer>
    </Container>
  );
};

const Container = styled.section`
  width: 176px;
  height: 154px;
  border: 2px solid ${customColor.gray};
  border-radius: 0 0 28px 28px;
  background-color: ${customColor.white};

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const NameInfo = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;
const LocationWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Footer = styled.section`
  display: flex;
  gap: 8px;
  justify-content: space-evenly;
`;

const LogOut = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const AccountDeletion = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;
