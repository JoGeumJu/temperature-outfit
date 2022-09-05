import styled from '@emotion/styled';
import { productApi } from 'api';
import { ClothesBox } from 'components/common';
import { useEffect, useState } from 'react';
import { productType } from 'types/editPage/product.type';
type Props = {
  clothesData: productType[] | undefined;
};
export const ClothesContainer = ({ clothesData }: Props) => {
  return (
      <Wrapper>
        {clothesData &&
          clothesData.map((data) => (
            <ClothesBox
              name={data.name}
              url={data.imageUrl}
              key={data.id}
              type="closet"
            />
          ))}
      </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 2fr));
  grid-auto-rows: 140px;
  justify-items: center;
`;
