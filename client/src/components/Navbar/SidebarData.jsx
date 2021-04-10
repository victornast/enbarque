import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiOutlineDashboard />,
    className: 'nav-text'
  },
  {
    title: 'Onboarding',
    path: '/onboarding',
    icon: <BsIcons.BsListCheck />,
    className: 'nav-text'
  },
  {
    title: 'Employees',
    path: '/user/team',
    icon: <BsIcons.BsPeople />,
    className: 'nav-text'
  },
  {
    title: 'Organization settings',
    path: '/corp/settings',
    icon: <GiIcons.GiSettingsKnobs />,
    className: 'nav-text'
  },
  {
    title: 'Account',
    path: '/corp/user/:id',
    icon: <FiIcons.FiUser />,
    className: 'nav-text'
  },
  {
    title: 'Sign Up',
    path: '/auth/sign-up',
    icon: <FiIcons.FiUserPlus />,
    className: 'nav-text'
  },
  {
    title: 'Log In',
    path: '/auth/log-in',
    icon: <FiIcons.FiLogIn />,
    className: 'nav-text'
  }
];
