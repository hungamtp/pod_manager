import { LayoutProps } from '@/models/index';
import Link from 'next/link';
import * as React from 'react';
import NavBar from '@/components/common/nav-bar';

export interface IMainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
