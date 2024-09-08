import { Vault } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const ThemeToggle = dynamic(() => import('./ui/theme-toggle'), { ssr: false });

export default function Navbar() {
    return (
        <nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95'>
            <div className='container flex h-14 max-w-screen-2xl items-center w-full'>
                <Link href='/' className='flex items-center'>
                    <Vault className='h-8 w-8 text-primary mr-2' />
                    <span className='text-xl font-bold'>CelebrityVault</span>
                </Link>
                <div className='flex  flex-1 items-center justify-end gap-4'>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
