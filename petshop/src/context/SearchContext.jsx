import { createContext, useContext, useState } from 'react';

// Create the Search Context
const SearchContext = createContext();

// This is the provider component which will wrap the entire app
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(''); // Holds the search query

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}  {/* Wraps everything inside this context */}
    </SearchContext.Provider>
  );
};

// This custom hook allows us to access the context value in any component
export const useSearch = () => useContext(SearchContext);
