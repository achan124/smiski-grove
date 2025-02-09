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
        <div className='mx-5 px-5'>
            <h2>Search for Smiskis to add to your collection or wishlist!</h2>

            <div className='d-flex'>
                <form className="d-flex gap-3 mt-4 searchForm" onSubmit={handleSubmitSearch}>
                    <button type="button" className="btn" onClick={toggleAdvancedButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                    <input type="search" placeholder="search by name or series" value={queryText} onChange={handleChange} className="form-control"/>
                    <button type="submit" className="btn" style={{ backgroundColor: '#87A96B', color: 'white' }}>Search</button>
                </form>
            </div>


            <div>
                <div className="d-flex mt-2 mb-5 justify-content-start">
                    {isAdvancedSearchExpanded && (
                        <div className="" >
                            {seriesList.map((series) => (
                                <button key={series} type="button" className="btn" style={{ border: '2px solid #48614A', color: '#48614A', margin: 5}}
                                    onClick={() => { setQueryText(series); 
                                                     handleSubmitAdvanced(series);}}>
                                    {series}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
                <div className="card-body d-flex flex-column ">

                    <div className="col-sm-auto col-md-6 col-xl-8 m-auto">
                        <img className="img-fluid pb-3" src={img} alt={`${series} ${name}`} style={{ borderRadius: '8px' }} />
                    </div>

                    <div>
                        <h3 className="card-title">{name}</h3>
                        <p>{series}</p>
                    </div>

                    <div className="d-flex gap-3 align-self-start">
                        <button className="btn wishlist-remove" disabled={isAddedToWishlist} onClick={() => onAddToWishlist({ series, name, img })} >
                            {isAddedToWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                        </button>
                        <button className="btn wishlist-remove" style={{ backgroundColor: isAddedToCollection ? 'lightgray' : '#819F80', color: 'black' }} disabled={isAddedToCollection} onClick={() => onAddToCollection({ series, name, img })} >
                            {isAddedToCollection ? 'Added to Collection' : 'Add to Collection'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
