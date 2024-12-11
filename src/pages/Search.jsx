import React, { useState } from 'react';


export function SearchPage({ smiskiImg, onAddToWishlist, onAddToCollection, }) {
    const [addedToWishlist, setAddedToWishlist] = useState([]);
    const [addedToCollection, setAddedToCollection] = useState([]);
    const [queryText, setQueryText] = useState('');
    const [targetSmiski, setTargetSmiski] = useState([]);
    const [isAdvancedSearchExpanded, setIsAdvancedSearchExpanded] = useState(false);

    const handleAddToWishlist = (item) => {
        setAddedToWishlist((prev) => [...prev, item]);
        onAddToWishlist(item); // Call the parent handler
    };

    const handleAddToCollection = (item) => {
        setAddedToCollection((prev) => [...prev, item]);
        onAddToCollection(item); // Call the parent handler
    };


    const handleChange = (event) => {
        setQueryText(event.target.value);
    }

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        const targetSmiski = smiskiImg.filter((item) =>
            item.name.toLowerCase().includes(queryText.toLowerCase()) ||
            item.series.toLowerCase().includes(queryText.toLowerCase())
        )
        setTargetSmiski(targetSmiski);
    }

    const handleSubmitAdvanced = (event) => {
        const targetSmiski = smiskiImg.filter((item) =>
            item.name.toLowerCase().includes(queryText.toLowerCase()) ||
            item.series.toLowerCase().includes(queryText.toLowerCase())
        )
        setTargetSmiski(targetSmiski);
    }
    const toggleAdvancedButton = () => {
        setIsAdvancedSearchExpanded(!isAdvancedSearchExpanded);
    }

    const seriesList = [...new Set(smiskiImg.map(item => item.series))];

    return (
        <div>
            <header className="text-center my-5 pt-5">
                <h1>Search</h1>
                <p className="lead">Use the Advanced Search to explore Smiskis by series!</p>

                <div className="d-flex justify-content-center">
                    <form className="input form-group" onSubmit={handleSubmitSearch}
                        style={{ width: 500 }}>
                        <div className="form-group mb-2">
                            <input type="search" placeholder="search for Smiskis by name/series"
                                value={queryText} onChange={handleChange} className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn w-100 mt-2" style={{ backgroundColor: '#87A96B', color: 'white' }}>Search</button>
                    </form>
                </div>

                {/* Advanced Search Button */}
                <div>
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#48614A', color: 'white', margin: 15, width: 500 }}
                        onClick={toggleAdvancedButton}
                    >
                        {isAdvancedSearchExpanded ? 'Hide Advanced Search' : 'Show Advanced Search'}
                    </button>
                    <div className="d-flex justify-content-center">
                        {isAdvancedSearchExpanded && (
                            <div className="advanced-search-expand" style={{ width: 500 }}>
                                {seriesList.map((series) => (
                                    <button
                                        key={series}
                                        type="button"
                                        className="btn w-30 mt-2"
                                        style={{ backgroundColor: '#48614A', color: 'white', margin:5}}
                                        onClick={() => {
                                            setQueryText(series);
                                            handleSubmitAdvanced(series);
                                            }}
                                    >
                                        {series}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>


            </header>

            {/* Card Section */}
            <main className="container">
                <div className="row">
                    {(targetSmiski.length > 0 ? targetSmiski : smiskiImg).map((smiski) => (
                        <Card
                            key={smiski.name + smiski.series}
                            series={smiski.series}
                            name={smiski.name}
                            img={smiski.img}
                            onAddToWishlist={handleAddToWishlist}
                            onAddToCollection={handleAddToCollection}
                            isAddedToWishlist={addedToWishlist.some(item => item.name === smiski.name)}
                            isAddedToCollection={addedToCollection.some(item => item.name === smiski.name)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

function Card({ series, name, img, onAddToWishlist, onAddToCollection, isAddedToWishlist, isAddedToCollection }) {
    return (
        <div className="col-6 col-md-6 col-xl-3 d-flex">
            <div className="card mb-4 w-100">
                <div className="card-body d-flex flex-column">
                    <div className="row">
                        <div className="col-sm-auto col-md-6 col-xl-12">
                            <img
                                className="img-fluid pb-3 wishlist-img"
                                src={img}
                                alt={`${series} ${name}`}
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
                        <div className="col-sm">
                            <div>
                                <h2 className="card-title">{name}</h2>
                                <p>{series}</p>
                            </div>
                            <div className="card-add d-flex flex-column">
                                <button
                                    className="btn wishlist-remove mb-2"
                                    disabled={isAddedToWishlist}
                                    onClick={() => onAddToWishlist({ series, name, img })}
                                >
                                    {isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                                </button>
                                <button
                                    className="btn wishlist-remove"
                                    style={{ backgroundColor: isAddedToCollection ? 'lightgray' : '#819F80', color: 'black' }}
                                    disabled={isAddedToCollection}
                                    onClick={() => onAddToCollection({ series, name, img })}
                                >
                                    {isAddedToCollection ? 'Added to Collection' : 'Add to Collection'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
