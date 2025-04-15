import { useState, useEffect, useCallback } from 'react';
import { CSS_CLASSES, EVENTS } from '../constants/terminalConstants';

/**
 * Custom hook that enables dragging functionality for a React component
 * @param {Object} initialPosition - Starting x,y coordinates 
 * @param {React.RefObject} ref - Reference to the DOM element to be dragged
 * @returns {Object} - Position, setter, dragging state and event handlers
 */
export const useDraggable = (initialPosition, ref) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Initiate dragging if header is clicked
    const handleMouseDown = (e) => {
        if (e.target.classList.contains(CSS_CLASSES.TERMINAL_HEADER)) {
            setIsDragging(true);
            calculateDragOffset(e);
        }
    };

    // Calculate offset from the mouse position to the element's top-left corner
    const calculateDragOffset = (e) => {
        const rect = ref.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // Calculate new position with boundary constraints
    const calculateNewPosition = useCallback((e) => {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        const rect = ref.current.getBoundingClientRect();

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        return {
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        };
    }, [dragOffset, ref]);

    // Update position while dragging, keeping within window boundaries
    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        
        const newPosition = calculateNewPosition(e);
        setPosition(newPosition);
    }, [isDragging, calculateNewPosition]);

    // End dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add and remove event listeners
    useEffect(() => {
        const handleMove = (e) => {
            if (ref && ref.current) {
                handleMouseMove(e);
            }
        };
        document.addEventListener(EVENTS.MOUSE_MOVE, handleMove);
        document.addEventListener(EVENTS.MOUSE_UP, handleMouseUp);

        return () => {
            document.removeEventListener(EVENTS.MOUSE_MOVE, handleMove);
            document.removeEventListener(EVENTS.MOUSE_UP, handleMouseUp);
        };
    }, [isDragging, ref, handleMouseMove]);

    return { position, setPosition, isDragging, handleMouseDown };
}; 