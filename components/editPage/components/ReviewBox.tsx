import React, { useState, ChangeEvent, useRef } from 'react';
import styled from '@emotion/styled';
import { CustomButton, TypoGraphy } from 'components/common';
import { customColor } from 'constants/index';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import {
  bottomState,
  etcState,
  outerState,
  shoesState,
  topState,
} from 'recoil/atom';
import { todayCodyApi } from 'api';
import { IoMdImage } from 'react-icons/io';
import { confirmModal, infoModal } from 'utils/interactionModal';
import { useRouter } from 'next/router';
interface ReviewBoxProps {
  day: string;
}

export function ReviewBox({ day }: ReviewBoxProps) {
  const router = useRouter();
  // console.log(JSON.parse(router.query.outfitData));

  const onSave = async () => {
    const frm = new FormData();
    let productsIdString = '';
    topImage.forEach((data) => (productsIdString += data.id + ','));
    outerImage.forEach((data) => (productsIdString += data.id + ','));
    bottomImage.forEach((data) => (productsIdString += data.id + ','));
    shoesImage.forEach((data) => (productsIdString += data.id + ','));
    etcImage.forEach((data) => (productsIdString += data.id + ','));
    productsIdString = productsIdString.slice(0, -1); // 반점 제거

    console.log(productsIdString);

    try {
      frm.append('date', `${day}`);
      frm.append('image', reviewImage!);
      frm.append('productsId', productsIdString);

      frm.append('comment', reviewText);
      frm.append('rating', rating);

      const data = await todayCodyApi.addProduct(frm);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const confirmBtn = () => {
    confirmModal('등록 하시겠습니까?', onSave);
  };

  const codyRef = useRef<HTMLInputElement>(null);

  const resetTop = useResetRecoilState(topState);
  const resetOuter = useResetRecoilState(outerState);
  const resetBottom = useResetRecoilState(bottomState);
  const resetShoes = useResetRecoilState(shoesState);
  const resetEtc = useResetRecoilState(etcState);

  const [reviewImage, setReviewImage] = useState<File>();
  const [reviewThumbnail, setReviewThumbnail] = useState<string>();
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<string>('0');
  const topImage = useRecoilValue(topState);
  const outerImage = useRecoilValue(outerState);
  const bottomImage = useRecoilValue(bottomState);
  const shoesImage = useRecoilValue(shoesState);
  const etcImage = useRecoilValue(etcState);

  const ResetAll = () => {
    resetTop();
    resetOuter();
    resetBottom();
    resetShoes();
    resetEtc();
    setReviewThumbnail('');
    setReviewImage(undefined);
    setReviewText('');
    setRating('0');
  };

  const handleRating = (rate: number) => {
    setRating(rate + '');
  };

  const addImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.value[0]) {
      const fileReader = new FileReader();
      // Todo : 필요하다면 나중에 replaceAll에 확장자명을 추가해야함.
      fileReader.readAsDataURL(e.target.files![0]);
      fileReader.onload = () => {
        setReviewThumbnail(String(fileReader.result!));
      };
      setReviewImage(e.target.files![0]);
      infoModal('코디 사진 변경완료!', 'success');
      e.target.value = '';
    }
  };

  return (
    <Container>
      <BoxWrapper>
        <AddButton
          id="codyImage"
          ref={codyRef}
          type="file"
          accept="image/*"
          onChange={addImage}
        />
        <ImageWrapper>
          {reviewThumbnail ? (
            <Image
              src={reviewThumbnail}
              alt="review"
              layout="fill"
              onClick={() => codyRef.current && codyRef.current.click()}
            />
          ) : (
            <InitialImage
              opacity={0.5}
              onClick={() => codyRef.current && codyRef.current.click()}
            />
          )}
        </ImageWrapper>
        <ButtonWrapper>
          <CustomButton
            customType="colorful"
            text="기본 이미지로 설정"
            sidePadding="20"
            onClick={() => {
              setReviewThumbnail('');
              setReviewImage(undefined);
            }}
          />
        </ButtonWrapper>
      </BoxWrapper>
      <BoxWrapper>
        <TypoGraphy type="Title" fontWeight="bold">
          후기
        </TypoGraphy>
        <TextArea
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
          }}
        />
      </BoxWrapper>
      <BoxWrapper>
        <TypoGraphy type="Title" fontWeight="bold">
          만족도
        </TypoGraphy>
        <StarWrapper>
          <Rating
            onClick={handleRating}
            ratingValue={Number.isNaN(parseInt(rating)) ? 0 : parseInt(rating)}
            size={40}
            allowHalfIcon
            transition
            fillColor="orange"
            emptyColor="gray"
          />
        </StarWrapper>
      </BoxWrapper>
      <ButtonContainer>
        <CustomButton
          customType="white"
          text="취소"
          sidePadding="40"
          onClick={() => ResetAll()}
        />
        <CustomButton
          customType="colorful"
          text="등록"
          sidePadding="40"
          onClick={() => confirmBtn()}
        />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.section`
  width: 40%;
  max-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AddButton = styled.input`
  display: none;
`;

const ImageWrapper = styled.section`
  position: relative;
  width: 360px;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  resize: none;
  padding: 8px;
  box-sizing: border-box;
  outline: none;
  ::-webkit-scrollbar {
    opacity: 0;
    height: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(179, 226, 255, 0.8);
    border-radius: 24px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;
const ButtonWrapper = styled.section`
  align-self: flex-end;
`;

const StarWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${customColor.brandColor5};
  margin-bottom: 40px;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 0 12px;
`;

const BoxWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px 0;
`;

const InitialImage = styled(IoMdImage)`
  width: 360px;
  height: 240px;
  background-color: ${customColor.gray};
`;
