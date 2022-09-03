import React, { useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import { useState } from 'react';
import { CustomButton, TypoGraphy } from 'components/common';
import { customColor, clothesSubCategory } from 'constants/index';
import { useRecoilState } from 'recoil';
import { chooseModal } from 'recoil/atom';
import { productType } from 'types/editPage/product.type';
import { frontApi } from 'api/productApi';
import { ModalClothesContainer } from './ModalClothesContainer';
type Props = {
  categoryLabel: string;
};
// 1. 옷 선택하기에서 data를 props로 받아오기
//

export const ChooseModal = ({ categoryLabel }: Props) => {
  const [chooseModalState, setChooseModalState] = useRecoilState(chooseModal);
  const [clothesData, setClothesData] = useState<Array<productType>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const switchMainCategory = () => {
    switch (categoryLabel) {
      case '상의':
        return 'top';

      case '아우터':
        return 'outer';

      case '하의':
        return 'bottom';

      case '신발':
        return 'shoes';

      case '기타':
        return 'mainETC';

      default:
        return '없는 카테고리입니다.';
    }
  };

  const category = switchMainCategory();

  const getClothes = useCallback(async () => {
    setLoading(true);
    await frontApi.getFilter({ categoryId: category }, setClothesData);
    // 아래는 확인용 코드
    // frontApi.getFilter({ categoryId: category, limit: 1000}, setClothesData);
    setLoading(false);
  }, [category]);

  useEffect(() => {
    getClothes();
  }, [getClothes]);

  const handleClose = () => {
    setChooseModalState((cur) => !cur);
  };

  return (
    <Container
      isOpen={chooseModalState}
      onRequestClose={() => handleClose()}
      ariaHideApp={false}
      contentLabel="Add Modal">
      {!loading && (
        <Wrapper>
          <TypoGraphy type="Title" fontWeight="bold">
            {/* {cloth} */}
            {categoryLabel}
          </TypoGraphy>
          <ContentBox>
            <ButtonBox>
              {clothesSubCategory[category] &&
                clothesSubCategory[category].map((item, index) => (
                  <CustomButton
                    onClick={() =>
                      frontApi.getFilter(
                        { categoryId: item.id },
                        setClothesData,
                      )
                    }
                    customType="white"
                    text={item.name}
                    key={index}
                  />
                ))}
            </ButtonBox>
            <ModalClothesContainer
              clothesData={clothesData}
              categoryLabel={categoryLabel}
            />
          </ContentBox>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 800px;
  transform: translate(-50%, -50%);
  background-color: ${customColor.white};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 4px 4px 5px 4px rgba(0, 0, 0, 0.43);
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    opacity: 0;
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(150, 137, 235, 0.6);
    border-radius: 24px;
  }
`;

const ContentBox = styled.section`
  width: 100%;
  border: 1px solid ${customColor.gray};
  border-radius: 20px;
  padding: 12px;
`;

const ButtonBox = styled.section`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;
