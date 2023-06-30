import { Link } from 'react-router-dom';

const artworkItem = ({
  data,
}: {
  data: { title: string; place: string; image: string; time: string; tags: string[] };
}) => {
  return (
    <div className="flex-[0_1_25%] black-right-border">
      <div className="pt-[88px] px-6 flex flex-col justify-between h-full">
        <div className="max-w-[246px] mx-auto">
          <div className="text-[20px] font-bold min-h-[96px] mb-6 line-clamp-3">{data.title}</div>
          <div className="text-[14px] whitespace-pre">
            {data.place} {'\n'}
            {data.time}
          </div>
          <div className="mt-10">
            {data.tags.map((tag) => (
              <Link className="text-[12px] block font-bold" key={tag} to={`/artworks/${tag}`}>
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        <img alt="" src={data.image} />
      </div>
    </div>
  );
};

export default artworkItem;
