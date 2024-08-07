import './styles.css';

import { animated, to, useSpring } from '@react-spring/web';
import useGlobalState from 'hooks/useGlobalState';
import useList from 'hooks/useList';
import type { IResearchItem } from 'models/research/types';
import { Link, useLocation } from 'react-router-dom';

// const artWorkMenus = [
//   {
//     title: 'Performance',
//     url: '/artworks/performance',
//   },
//   {
//     title: 'Sculpture',
//     url: '/artworks/sculpture',
//   },
//   {
//     title: 'Installation',
//     url: '/artworks/installation',
//   },
//   {
//     title: 'Collaboration',
//     url: '/artworks/collaboration',
//   },
//   {
//     title: 'Video',
//     url: '/artworks/video',
//   },
//   {
//     title: 'Others',
//     url: '/artworks/others',
//   },
// ];

const writingMenus = [
  {
    title: 'Writings',
    url: '/writings/verses',
  },
  // {
  //   title: 'Essays',
  //   url: '/writings/essays',
  // },
  {
    title: 'Publications',
    url: '/writings/publications',
  },
];

const HamburgetButton = () => {
  const { list: tagList } = useList<{ name: string }>({
    collectionName: 'tag',
    order: 'asc',
    staleTime: Infinity,
  });
  const { list: researchList } = useList<IResearchItem>({
    collectionName: 'research',
    staleTime: Infinity,
  });
  const artWorkMenus = tagList.map((item) => ({
    title: item.name.toLowerCase(),
    url: `/artworks/${item.name.toLowerCase()}`,
  }));

  const researchMenus = researchList.map((item) => ({
    title: item.title,
    url: `/research/${item.id}`,
  }));

  const categories = [
    { title: 'Arts', menus: artWorkMenus, activeKeys: artWorkMenus.map((menu) => menu.url) },
    { title: 'Works', menus: writingMenus, activeKeys: writingMenus.map((menu) => menu.url) },
    { title: 'Research', menus: researchMenus, activeKeys: researchMenus.map((menu) => menu.url) },
  ] as const;

  const { drawer, setDrawer } = useGlobalState();
  const { pathname } = useLocation();
  const props = useSpring({
    rotate: drawer ? 45 : 0,
    opacity: drawer ? 0 : 1,
  });
  return (
    <div className="drawer justify-center">
      <input
        checked={drawer}
        className="drawer-toggle"
        id="my-drawer"
        onChange={(e) => setDrawer(e.target.checked)}
        type="checkbox"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          className="w-[24px] h-[24px] flex justify-center items-center flex-col gap-[6px] pointer relative mx-[3px]"
          htmlFor="my-drawer"
        >
          <animated.span
            className="w-full border-b-[1px] border-black"
            style={{ opacity: props.opacity }}
          />
          <animated.span
            className="w-full border-b-[1px] border-black absolute"
            style={{ rotate: props.rotate }}
          />
          <animated.span
            className="w-full border-b-[1px] border-black"
            style={{ opacity: props.opacity }}
          />
          <animated.span
            className="w-full border-b-[1px] border-black absolute"
            style={{ rotate: to(props.rotate, (rotate) => -rotate) }}
          />
          <animated.span
            className="w-full border-b-[1px] border-black"
            style={{ opacity: props.opacity }}
          />
        </label>
      </div>
      <div className="drawer-side z-10 ml-[72px] w-[calc(100%-72px)]">
        <label className="drawer-overlay" htmlFor="my-drawer" />
        <div className="items-container">
          <div>
            {categories.map((category) => {
              const isActiveTitle = !!category.activeKeys.find((key) => pathname.startsWith(key));
              return (
                <div className="mb-10" key={category.title}>
                  <div
                    className={`section-title mb-3 ${
                      isActiveTitle ? 'font-semibold' : 'blur-text'
                    }`}
                  >
                    {category.title}
                  </div>
                  {category.menus.map((subMenu) => {
                    const isActivePath = pathname.startsWith(subMenu.url);
                    return (
                      <Link
                        className={`${
                          isActivePath ? 'font-normal' : 'blur-text'
                        } text-[16px] mb-2 block leading-[22px] hover:opacity-100`}
                        key={subMenu.title}
                        onClick={() => setDrawer(false)}
                        to={subMenu.url}
                      >
                        <span
                          className={!isActivePath ? 'hover-underline inline-block' : ''}
                          style={{
                            textTransform: 'capitalize',
                          }}
                        >
                          {subMenu.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgetButton;
