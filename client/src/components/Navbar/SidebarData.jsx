import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as FiIcons from 'react-icons/fi';
import * as CgIcons from 'react-icons/cg';

export const generateSidebarData = (user) => [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiOutlineDashboard />,
    className: 'nav-text'
  },
  {
    title: 'Organization settings',
    path: '/corp/settings',
    icon: <GiIcons.GiSettingsKnobs />,
    className: 'nav-text'
  },
  ...(user
    ? [
        {
          title: 'Account',
          path: `/corp/user/${user._id}`,
          icon: <FiIcons.FiUser />,
          className: 'nav-text'
        }
      ]
    : []),

  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: <FiIcons.FiUserPlus />,
    className: 'nav-text'
  },
  {
    title: 'Log In',
    path: '/auth/signin',
    icon: <FiIcons.FiLogIn />,
    className: 'nav-text'
  }
];
