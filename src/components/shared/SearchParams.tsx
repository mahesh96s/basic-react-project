import React, { ChangeEvent } from 'react';
import { debounce } from 'lodash';

const SearchParams = ({setSearchValue}: {setSearchValue(searchValue: string) : void}) => {

    const handleInputChange = debounce((event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value), 750);

    return (
        <>
            <label className="search-label">
                <div className="search-text-field">
                    <input type="text" name="search" placeholder="Search" onChange={handleInputChange}/>
                </div>
            </label>
        </>
    )
}

export default SearchParams;