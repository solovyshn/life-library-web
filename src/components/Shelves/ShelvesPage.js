import React, { useState, useEffect } from 'react';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import HeaderLogged from "../headerLogged.js"
import BookItem from "./BookItem.js"

function ShelvesPage() {
    const navigate = useNavigate();
    const [shelvesInfo, setShelvesInfo] = useState(null);
    const [activeShelf, setActiveShelf] = useState(null);
    const accesstoken = localStorage.getItem('access_token')
    const userID = localStorage.getItem('userid')

    useEffect(() => {
        const fetchShelves = async () => {
          try {
            const response = await fetch(`http://localhost:5000/shelves/${userID}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accesstoken}`
              }
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setShelvesInfo(data);
            const activeShelfName = localStorage.getItem('selectedShelf');
            if(activeShelfName){
                setActiveShelf(activeShelfName);
            }
            else if (data.length > 0) {
              setActiveShelf(data[0].shelf_name); // Set the first shelf as active by default
            }
            console.log(data);
          } catch (error) {
            console.error('Error fetching shelves:', error);
          }
        };
    
        fetchShelves();
      }, [userID, accesstoken]);

      const handleShelfClick = (shelfName) => {
        setActiveShelf(shelfName);
      };


      const renderBooksForActiveShelf = () => {
        const activeShelfData = shelvesInfo.find(shelf => shelf.shelf_name === activeShelf);
        if (!activeShelfData) return null;
        if (!activeShelfData.books || activeShelfData.books.length === 0) {
            return <p className='empty-shelf'>Unfortunately, this shelf is empty. Try searching for new books to add them in here.</p>;
          }
        
        return activeShelfData.books.map((book, index) => (
            <BookItem key={index} book={book}/>
        ));
      };
    
        return (
        <div>
            <HeaderLogged />
            <div className='container'>
            {shelvesInfo ? (
            <div>
                <h1 className='shelves-title'>Your Book Shelves</h1>
                <nav className="navigation">
                    {shelvesInfo.map((shelf, index) => (
                        <button
                            key={index}
                            className={activeShelf === shelf.shelf_name ? 'active' : ''}
                            onClick={() => handleShelfClick(shelf.shelf_name)}
                        >
                            {shelf.shelf_name}
                        </button>
                    ))}
                    <button className='add-shelf'>Add</button>
                </nav>
                <div className="booklist">
                    <div className="booklist-header">
                        <span></span>
                        <span>Title & Author</span>
                        <span>Genre</span>
                        <span>Added date</span>
                        <span></span>
                    </div>
                    <div >
                        {renderBooksForActiveShelf()}
                    </div>
                </div>
            </div>
            ):(
                <p>Loading account information...</p>
            )}


            </div>

        </div>
    );
}

export default ShelvesPage;