import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    cName: 'nav-text',
    iconComponent: () => <AiIcons.AiFillHome />,
  },
  {
    title: 'Tracker',
    path: '/tracker',
    cName: 'nav-text',
    iconComponent: () => <AiIcons.AiFillSignal />,
  },
  {
    title: 'Search',
    path: '/search',
    cName: 'nav-text',
    iconComponent: () => <FaSearch />,
  },
];
