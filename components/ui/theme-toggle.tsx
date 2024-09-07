'use client';

import { useTheme } from 'next-themes';
import { Button } from './button';
import { Laptop, Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <div className='flex  gap-4' role='radiogroup'>
            <Button
                onClick={() => setTheme('dark')}
                aria-label='Dark'
                type='button'
                variant='ghost'
                size='icon'
                className={`rounded-full  ${theme === 'dark' ? 'bg-black/20 dark:bg-white/20' : ''}`}>
                <Moon className='size-5' />
            </Button>
            <Button
                onClick={() => setTheme('light')}
                aria-label='Light'
                type='button'
                variant='ghost'
                size='icon'
                className={`rounded-full  ${theme === 'light' ? 'bg-black/20 dark:bg-white/20' : ''}`}>
                <Sun className='size-5' />
            </Button>
            <Button
                onClick={() => setTheme('system')}
                aria-label='System'
                type='button'
                variant='ghost'
                size='icon'
                className={`rounded-full  ${theme === 'system' ? 'bg-black/20 dark:bg-white/20' : ''}`}>
                <Laptop className='size-5' />
            </Button>
        </div>
    );
}
