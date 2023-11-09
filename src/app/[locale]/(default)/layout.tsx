import { Container } from '@radix-ui/themes';
import React from 'react';

import { Footer } from '@src/features/Footer';
import { Navbar } from '@src/features/Navbar';
import { TabBar } from '@src/features/TabBar';

export default function DefaultLayout({
    children,
}: {
  children: React.ReactElement;
}) {
    return (
        <>
            <Navbar />
            <Container size="4" px="4" py="6">
                {children}
            </Container>
            <Footer />
            <TabBar />
        </>
    );
}
