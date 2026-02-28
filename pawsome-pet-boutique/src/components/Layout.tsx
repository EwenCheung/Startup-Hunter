import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isProductDetails = location.pathname.includes('/product/');

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className={`w-full max-w-[430px] bg-background-light dark:bg-background-dark min-h-screen shadow-2xl relative flex flex-col ${isProductDetails ? '' : 'pb-20'}`}>
        {children}
      </div>
    </div>
  );
}
