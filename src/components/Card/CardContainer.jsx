import React from 'react';

/**
 * CardContainer Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @param {string} props.width - The width of the card (e.g., "w-full", "w-1/2").
 * @param {string} props.shadow - The shadow style of the card (e.g., "shadow-md", "shadow-lg").
 * @returns {React.ReactElement} - A card container component with provided children, width, and shadow styles.
 */
const CardContainer = ({ children, width, shadow }) => {
  return (
    // Card container with dynamic classes based on provided props
    <div className={`bg-white rounded-xl ${shadow ? shadow : "shadow-md"} overflow-hidden p-3 ${width}`}>
      {/* Render the children inside the card */}
      {children}
    </div>
  );
};

export default CardContainer;
