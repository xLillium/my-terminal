import { useState, useEffect, useCallback } from 'react';

export const useDraggable = (initialPosition, ref) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        if (e.target.classList.contains('terminal-header')) {
            setIsDragging(true);
            const rect = ref.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            const rect = ref.current.getBoundingClientRect();

            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
        }
    }, [isDragging, dragOffset, ref]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleMove = (e) => {
            if (ref && ref.current) {
                handleMouseMove(e);
            }
        };
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, ref, handleMouseMove]);

    return { position, setPosition, isDragging, handleMouseDown };
}; 