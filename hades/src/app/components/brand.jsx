import ThemeToggle from './system';
import Link from 'next/link';

export default async function Brand({ className }) {
    return (
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-0">
            <div className={`w-full flex flex-col pb-8 ${className}`}>
                <Link href="/">
                    <h1 className="font-jaro text-7xl lowercase text-black dark:text-white text-center sm:text-left">Ha<span className="text-red-500">d</span>es</h1>
                </Link>
                <span className="font-kode-mono lowercase text-black dark:text-white text-center sm:text-left">A video game death tracker</span>
            </div>
            <ThemeToggle className="h-fit" />
        </div>
    );
}