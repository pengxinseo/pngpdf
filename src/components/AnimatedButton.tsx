import React from 'react';
import { Button } from '@/components/ui/button';

interface AnimatedButtonProps {
    bg?: any;
    className?: any,
    children?: React.ReactNode;
    isBorder?: boolean; 
    arialabel?: any;
    [key: string]: any; 
}

const AnimatedButton = ({ className, bg, children, isBorder,arialabel , ...props }:AnimatedButtonProps) => {
    return (
        <Button aria-label={arialabel} className={`relative group animate-delay-in text-black font-semibold bg-purple-950 ${className}`} {...props}>
            <div className={`absolute ${isBorder ? 'border' : ''} items-center inset-0 z-10 w-full h-full duration-300 ease-out  dark:bg-neutral-950 rounded-sm group-hover:-translate-x-1 group-hover:-translate-y-1 ${bg}`}/>
            <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out rounded-sm border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1" />
            <div className={`relative items-center flex z-50 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1`}>
                {children}
            </div>
        </Button>
    );
};

export default AnimatedButton;
