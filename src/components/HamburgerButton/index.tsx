import './styles.css';

import { animated, to, useSpring } from '@react-spring/web';
import useGlobalState from 'hooks/useGlobalState';
import { Link, useLocation } from 'react-router-dom';

const aboutMeMenus = [
  {
    title: 'Do Nguyen Lap Xuan',
    url: '/statement',
  },
  {
    title: 'News',
    url: '/news',
  },
];

const artWorkMenus = [
  {
    title: 'Performance',
    url: '/artworks/performance',
  },
  {
    title: 'Sculpture',
    url: '/artworks/sculpture',
  },
  {
    title: 'Installation',
    url: '/artworks/installation',
  },
  {
    title: 'Collaboration',
    url: '/artworks/collaboration',
  },
  {
    title: 'Video',
    url: '/artworks/video',
  },
  {
    title: 'Others',
    url: '/artworks/others',
  },
];

const writingMenus = [
  {
    title: 'Verses',
    url: '/writings/verses',
  },
  {
    title: 'Essays',
    url: '/writings/essays',
  },
  {
    title: 'Books',
    url: '/writings/books',
  },
];

const researchMenus = [
  {
    title: 'The Transversality of Voice',
    url: '/research/transversality',
  },
  {
    title: 'Artistic Education',
    url: '/research/artistic-education',
  },
];

const categories = [
  { title: 'About Me', menus: aboutMeMenus, activeKeys: aboutMeMenus.map((menu) => menu.url) },
  { title: 'Artworks', menus: artWorkMenus, activeKeys: artWorkMenus.map((menu) => menu.url) },
  { title: 'Writings', menus: writingMenus, activeKeys: writingMenus.map((menu) => menu.url) },
  { title: 'Research', menus: researchMenus, activeKeys: researchMenus.map((menu) => menu.url) },
] as const;

const HamburgetButton = () => {
  const { drawer, setDrawer } = useGlobalState();
  const { pathname } = useLocation();
  const props = useSpring({
    rotate: drawer ? 45 : 0,
    opacity: drawer ? 0 : 1,
  });
  return (
    <div className="drawer nav-container">
      <div className="drawer">
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
                const isActiveTitle = category.activeKeys.includes(pathname);
                return (
                  <div className="mb-10" key={category.title}>
                    <div
                      className={`section-title mb-3 ${isActiveTitle ? 'font-bold' : 'blur-text'}`}
                    >
                      {category.title}
                    </div>
                    {category.menus.map((subMenu) => {
                      const isActivePath = pathname === subMenu.url;
                      return (
                        <Link
                          className={`${
                            isActivePath ? 'font-bold' : 'blur-text'
                          } text-lg mb-3 block`}
                          key={subMenu.title}
                          to={subMenu.url}
                        >
                          {subMenu.title}
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
    </div>
  );
};

export default HamburgetButton;
