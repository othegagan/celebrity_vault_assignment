import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './input';

export default function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 300,
    placeholder,
    ...props
}: {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className='relative flex w-full items-center gap-2'>
            <Search className='absolute left-2 mr-2 size-4 text-muted-foreground' />
            <Input
                {...props}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                type='text'
                placeholder={placeholder || 'Search...'}
                className='pl-8'
            />
            {value !== '' && (
                <div title='Clear search' className='absolute right-2 mr-2'>
                    <X className=' size-4 cursor-pointer text-muted-foreground' onClick={() => setValue('')} />
                </div>
            )}
        </div>
    );
}
