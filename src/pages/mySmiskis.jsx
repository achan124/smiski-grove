import React, { useState } from 'react'; 

export function MySmiskisPages({ wishlist, collection, removeFromWishlist, removeFromCollection }) {
    const [activeTab, setActiveTab] = useState('wishlist');

    const renderSmiskis = (items, removeHandler, emptyMessage) => (
        items.length > 0 ? (
            items.map(item => (
                <div className="col-6 col-md-6 col-xl-3 d-flex" key={item.id}>
                    <div className="card mb-4 w-100">

                        <div className="card-body d-flex flex-column">

                            <div className="col-sm-auto col-md-6 col-xl-8 m-auto">
                                <img className="img-fluid pb-3" src={item.img} alt={item.alt} />
                            </div>

                            <div>
                                <h2 className="card-title">{item.name}</h2>
                                <p>{item.series}</p>
                            </div>
                            <div className="card-add">
                                <button className="btn wishlist-remove" onClick={() => removeHandler(item.name)}>{activeTab === 'wishlist' ? 'Remove from Wishlist' : 'Remove from Collection'}</button>
                            </div>

                        </div>

                    </div>
                </div>
            ))
        ) : (
            <div className="col-12 text-center">
                <p>{emptyMessage}</p>
            </div>
        )
    );

    return (
        <div className="wishlist-content">
            <header>
                <h1>My Smiskis</h1>
            </header>

            <div className="wishlist-tabs">
                <button className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>Wishlist</button>
                <button className={`tab collection-tab ${activeTab === 'collection' ? 'active' : ''}`} onClick={() => setActiveTab('collection')}>Collection</button>
            </div>

            <div className={`row wishlist-cards-tab ${activeTab === 'collection' ? 'collection-cards-tab' : ''}`}>
                {activeTab === 'wishlist' ? renderSmiskis(wishlist, removeFromWishlist, 'Your wishlist is empty!') : renderSmiskis(collection, removeFromCollection, 'Your collection is empty!')}
            </div>
        </div>
    )
}