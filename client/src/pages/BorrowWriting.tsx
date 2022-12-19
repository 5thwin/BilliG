import { useRef, useState, MouseEvent, ChangeEvent } from 'react';
import {
  imageUploadStore,
  tradeWayStore,
  hashTagStore,
} from './../store/PostStore';

import HashTagSection from '../components/postWrite/HashTagWrite';
import ImageUpload from '../components/postWrite/ImageUpload';
import TradeWay from '../components/postWrite/TradeWay';
import axios from 'axios';

export default function BorrowWriting() {
  // store에서 가져오는 state들
  const { hashTags } = hashTagStore();
  const { imgFiles } = imageUploadStore();
  const { tradeWay } = tradeWayStore();

  // 빌립니다 글쓰기
  const today = new Date()
    .toLocaleDateString()
    .replace(/\./g, '')
    .replace(/\s/g, '-');

  // Ref
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceDayRef = useRef<HTMLInputElement>(null);
  const priceTimeRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // let title = productNameRef.current?.value;
  // const priceDay = priceDayRef.current?.value;
  // const priceTime = priceTimeRef.current?.value;
  // let category = categoryRef.current?.value;

  // // 등록하기 클릭 시
  // function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   // console.log(productNameRef.current?.value);
  //   // console.log(priceDay.current?.value);
  //   // console.log(priceTime.current?.value);
  //   // console.log(period.current?.value);
  //   // console.log(
  //   //   category.current?.options[category.current?.selectedIndex].innerText,
  //   // );
  //   console.log(hashTags);
  //   console.log(tradeWay);
  //   console.log('file', imgFiles);
  //   console.log(reservationDate);

  //   const formData = new FormData();
  //   formData.append('category', writeData.category);
  // }

  const [reservationDate, setReservationDate] = useState({
    start: '',
    end: '',
  });

  function startDate(e: ChangeEvent<HTMLInputElement>) {
    const newReservationDate = {
      ...reservationDate,
      start: e.currentTarget.value,
    };
    setReservationDate(newReservationDate);
  }

  function endDate(e: ChangeEvent<HTMLInputElement>) {
    const newReservationDate = {
      ...reservationDate,
      end: e.currentTarget.value,
    };
    setReservationDate(newReservationDate);
  }

  async function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const formData = new FormData();
    imgFiles.forEach((imgFile) => formData.append('productImg', imgFile));
    const writeData = {
      category:
        categoryRef.current?.options[categoryRef.current?.selectedIndex]
          .innerText,
      title: productNameRef.current?.value,
      // imgFiles,
      priceDay: priceDayRef.current?.value,
      priceTime: priceTimeRef.current?.value,
      reservationDate: reservationDate,
      description: descriptionRef.current?.value,
      tradeWay: tradeWay,
      hashTags: hashTags,
    };

    formData.append('data', JSON.stringify(writeData));

    console.log(productNameRef.current?.value);
    // console.log(priceDay.current?.value);
    // console.log(priceTime.current?.value);
    // console.log(period.current?.value);
    // console.log(
    //   category.current?.options[category.current?.selectedIndex].innerText,
    // );
    // console.log(hashTags);
    // console.log(tradeWay);
    // console.log('file', imgFiles);
    // console.log(reservationDate);

    // const submitPost = await axios({
    //   method: 'POST',
    //   url: ``,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   data: formData,
    // });
    // console.log(submitPost);
  }

  // type WriteDataType = {
  //   // category: string;
  //   // title: string;
  //   // imgFiles: FileList | undefined;
  //   // priceDay: number | undefined;
  //   // priceTime: number | undefined;
  //   // reservationDate: object;
  //   // description: string | undefined;
  //   // tradeWay: object;
  //   hashTags: string[];
  // };
  // const addPost = async () => {
  //   const writeData = {
  //     category:
  //       categoryRef.current?.options[categoryRef.current?.selectedIndex]
  //         .innerText,
  //     title: productNameRef.current?.value,
  //     // imgFiles,
  //     priceDay: priceDayRef.current?.value,
  //     priceTime: priceTimeRef.current?.value,
  //     reservationDate: reservationDate,
  //     description: descriptionRef.current?.value,
  //     tradeWay: tradeWay,
  //     hashTags: hashTags,
  //   };
  //   console.log(writeData);
  //   // const a = await onSubmit(writeData);
  // };

  // const onSubmit = async (data: WriteDataType) => {
  //   http.defaults.headers['Content-Type'] = 'multipart/form-data';

  // formData.append('category', data.category);
  // formData.append('priceDay', data.priceDay);
  // formData.append('imgFiles', data.imgFiles);
  // formData.append('title', data.title);
  // formData.append('imgFiles', writeData.imgFiles);

  // data.imgFiles.forEach((imgFile) => formData.append('productImg', imgFile));
  // formData.append('priceDay', data.priceDay);
  // formData.append('priceTime', data.priceTime);
  // formData.append('reservationDate', data.reservationDate);
  // formData.append('description', data.description);
  // formData.append('hashTags', data.hashTags);
  // data.hashTags.forEach((hashTag) => formData.append('hashTag', hashTag));

  // };
  // const formData = new FormData();
  // formData.append('category', writeData.category);
  // formData.append('priceDay', writeData.priceDay);
  // formData.append('imgFiles', writeData.imgFiles);
  // formData.append('title', writeData.title);
  // formData.append('imgFiles', writeData.imgFiles);
  // formData.append('priceDay', writeData.priceDay);
  // formData.append('priceTime', writeData.priceTime);
  // formData.append('reservationDate', writeData.reservationDate);
  // formData.append('description', writeData.description);
  // formData.append('hashTags', writeData.hashTags);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="w-[800px] flex flex-col justify-center mx-auto text-b-text-black">
        <div className="h-80">header</div>
        <div className="mb-6 text-3xl">빌리기</div>
        <form>
          {/* 상품명/카테고리 section */}
          <section className="flex mb-4">
            <select
              ref={categoryRef}
              className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
            >
              <option value="1">카테고리</option>
              <option value="2">IT/가전</option>
              <option value="3">의류</option>
              <option value="4">캠핑/레저</option>
              <option value="5">완구/취미</option>
              <option value="6">도서/음반</option>
            </select>
            <input
              ref={productNameRef}
              id="productName"
              className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              type="text"
              placeholder="상품명"
            />
          </section>

          {/* 사진 업로드 component */}
          <ImageUpload />

          {/* 요금 section */}
          <section className="flex items-center mb-4">
            <div className="w-[100px] p-3 text-center">요금</div>
            <input
              ref={priceTimeRef}
              type="number"
              className="appearance: none p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div className="mr-5">원/시간</div>
            <input
              ref={priceDayRef}
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="">원/일</span>
          </section>

          {/* 빌리는 기간 section */}
          <section className="mb-4 flex items-center">
            <div className="w-[100px] p-3 text-center">예약기간</div>
            <input
              onChange={startDate}
              ref={periodRef}
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div>~</div>
            <input
              onChange={endDate}
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 상품 상세내용 section */}
          <section className="mb-4">
            <textarea
              ref={descriptionRef}
              placeholder="사이즈, 색상 등 상세정보를 입력하면 좋아요!"
              className="p-3 w-full h-40 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 거래방법 section */}
          <TradeWay />

          {/* 해시태그 component */}
          <HashTagSection />

          <section className="flex flex-col justify-center items-center">
            <button
              type="button"
              onClick={handleButtonClick}
              className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-100"
            >
              등록하기
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
