import React, { ChangeEvent } from 'react';

interface SearchFilterParams {
    searchValue: string;
    setSearchValue(searchValue: string) : void;
}

const SearchParams = ({searchValue, setSearchValue}: SearchFilterParams) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchValue(event.target.value);
    };

    return (
        <div>
            <label className="search-label">
                <div className="search-text-field">
                    <input type="text" name="search" placeholder="Search" value={searchValue} onChange={handleInputChange}/>
                </div>
            </label>
        </div>
    )
}

export default SearchParams;