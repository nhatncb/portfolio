import ArrowLeftIcon from 'assets/icons/arrow-left.svg';
import ArrowRightIcon from 'assets/icons/arrow-right.svg';
import PlusIcon from 'assets/icons/plus-circle.svg';
import dayjs from 'dayjs';
import useList from 'hooks/useList';
import type { IVerseItem } from 'models/verses/types';
import { Link, useNavigate, useParams } from 'react-router-dom';

const VerseDetail = () => {
  const { verseId = '' } = useParams();
  const { list } = useList<IVerseItem>({ collectionName: 'verses', staleTime: Infinity });

  const detail = list.find((item) => item.id === verseId);
  const navigate = useNavigate();

  const handleNavigate = (next?: boolean) => {
    const currentIndex = list.findIndex((item) => item.id === detail?.id);
    if (next) {
      if (currentIndex < list.length - 1) {
        navigate(`/writings/verses/${list[currentIndex + 1]?.id}`);
      }
      if (currentIndex === list.length - 1) {
        navigate(`/writings/verses/${list[0]?.id}`);
      }
    } else {
      if (currentIndex > 0) {
        navigate(`/writings/verses/${list[currentIndex - 1]?.id}`);
      }
      if (currentIndex === 0) {
        navigate(`/writings/verses/${list[list.length - 1]?.id}`);
      }
    }
  };
  return (
    <div className="h-screen bg-white flex flex-1">
      <div className="flex-1 flex flex-col">
        <div className="text-[20px] leading-[26px] flex-1 black-bottom-border px-[48px] grid-cols-12 grid-rows-6	grid gap-[24px] whitespace-pre-line">
          <div className="row-start-2 col-start-2 col-span-2 relative">
            <span className="absolute top-0 left-0">{detail?.verses[0]?.content}</span>
          </div>
          <div className="row-start-3 col-start-4 col-span-2 relative">
            <span className="absolute top-0 left-0">{detail?.verses[1]?.content}</span>
          </div>
          <div className="row-start-4 col-start-6 col-span-2 relative">
            <span className="absolute top-0 left-0">{detail?.verses[2]?.content}</span>
          </div>
        </div>
        <div className="h-[100px] px-12 py-[25px] flex justify-end items-center black-bottom-border text-[32px] leading-[36px] font-semibold">
          {detail?.name}
        </div>
        <div className="flex py-6 px-[48px] justify-between">
          <Link className="flex items-center gap-[6px]" to="/writings/verses">
            <PlusIcon />
            <div className="normal-text font-medium">verse list</div>
          </Link>
          <div className="flex gap-8">
            <div className="text-[12px] leading-[16px] flex gap-1">
              <div>{detail?.place}</div>
              <div>|</div>
              <div>{detail?.time && dayjs(detail?.time).format('YYYY')}</div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-4">
                <button onClick={() => handleNavigate()}>
                  <ArrowLeftIcon />
                </button>
                <button onClick={() => handleNavigate(true)}>
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseDetail;
