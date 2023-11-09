'use client';
import dynamic from 'next/dynamic';

const TabBarBase = dynamic(() => import('./TabBar'), { ssr: false });

export const TabBar: React.FC = () => {
    return (
        <TabBarBase />
    );
};
