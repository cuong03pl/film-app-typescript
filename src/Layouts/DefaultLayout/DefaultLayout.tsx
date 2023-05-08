import React, { ReactNode } from 'react';
import Header from '../components/Header/Header';
import RightBar from '../components/RightBar/RightBar';
import AuthProvider from '../../context/AuthProvider';

export interface DefaultLayoutProps {
    children: ReactNode
}

export default function DefaultLayout  ({children}: DefaultLayoutProps) {
  return (
    <div className="flex  bg-bgPrimary h-full">
      <AuthProvider>
        <Header />
        <div className="flex justify-between w-full">
          {children}
          <RightBar />
        </div>
      </AuthProvider>
    </div>
  );
}
