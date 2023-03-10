import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/customAxios';
// components
import SearchItemCard from '../components/searchPage/SearchItemCard';
import HashTag from 'components/tag/HashTag';
import Footer from '../components/footer/Footer';
import { Item } from 'components/myinfo/MyLendPostList';
import SearchItemCardSeleton from 'components/searchPage/SearchItemCard-skeleton';
// icon
import { FiSearch } from 'react-icons/fi';
import { Pagination } from '../components/Pagination';
import Loading from '../components/Loading';

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const [searchWord, setSearchWord] = useState<string>('');
  const [pagination, setPagination] = useState({
    totalPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [items, setItems] = useState([]);
  const [radioStatus, setRadioStatus] = useState('lend');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchItems = await api.get(
      `/product/page?postType=${radioStatus}&per=10&page=1&hashtag=${searchWord}`,
    );

    const { hasNextPage, hasPrevPage } = searchItems.data;
    setItems(searchItems.data.docs);
    setPagination({
      totalPage: searchItems.data.totalPages,
      hasNextPage,
      hasPrevPage,
    });
  };

  const { isLoading, data: hashtags } = useQuery(
    ['hashtags'],
    async () => {
      return api.get(`/hashtag/popular?products=50&hashtags=10`);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  );
  if (isLoading) return <Loading />;
  return (
    <div className="w-screen max-w-screen-lg relative m-auto">
      {/* radio btn */}
      <form className="flex text-xl font-bold py-2 px-32 mb-1">
        <div className="mr-3">
          <input
            id="lend"
            name="lend"
            type="radio"
            checked={radioStatus === 'lend'}
            onChange={() => setRadioStatus('lend')}
            className="mr-1"
          ></input>
          <label htmlFor="lend">????????????</label>
        </div>
        <div>
          <input
            id="borrow"
            name="borrow"
            type="radio"
            checked={radioStatus === 'borrow'}
            onChange={() => setRadioStatus('borrow')}
            className="mr-1"
          ></input>
          <label htmlFor="lend">?????????</label>
        </div>
      </form>
      {/* Searchbar */}
      <form
        action="submit"
        className="w-full flex justify-center mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="searchWord"
          onChange={(e) => {
            setSearchWord(e.currentTarget.value);
          }}
          placeholder="???????????? ??????????????????..."
          className="w-full text-xl max-w-3xl border-b border-solid border-b-yellow px-4 py-3 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute p-2 text-4xl right-32 text-b-yellow hover: ease-in-out duration-300"
        >
          <FiSearch />
        </button>
      </form>
      {/* hashTags */}
      <section className="hashtag_section">
        <div className="text-2xl font-bold py-2 px-32 mb-1">
          <span>?????? ?????????</span>
        </div>
        <div className="w-3/4 h-20 m-auto border">
          <ul className="flex">
            {hashtags?.data.map((tag: Tag) => (
              <li key={tag._id}>
                <HashTag name={tag.name} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* ItemCard section*/}
      <section className="itemcard_section">
        <div>
          <div className="text-2xl font-bold py-2 px-32 mb-1">
            {radioStatus === 'lend' ? (
              <span>???????????? ?????????</span>
            ) : (
              <span>????????? ?????????</span>
            )}
          </div>
        </div>
        <ul>
          {items.length > 0 ? (
            items.map((item: Item) => (
              <SearchItemCard key={item._id} item={item} />
            ))
          ) : (
            <ul>
              <SearchItemCardSeleton />
              <SearchItemCardSeleton />
              <SearchItemCardSeleton />
              <SearchItemCardSeleton />
            </ul>
          )}
        </ul>
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={pagination.totalPage}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      </section>
      <Footer />
    </div>
  );
}

type Tag = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  mentions: number;
  recentMentions: number;
  name: string;
};
