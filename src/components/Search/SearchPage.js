import React, {useEffect, useState} from 'react';
import '../styles.css';
import HeaderLogged from "../headerLogged.js"
import BookItemForSearch from "./BookItemForSearch.js"

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState(null);
  const accesstoken = localStorage.getItem('access_token');
  const searchPar = localStorage.getItem('searchPar');

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search/${searchPar}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accesstoken}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
          setSearchResult(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching shelves:', error);
        }
      };
      fetchSearch();
    }, [searchPar, accesstoken]);
    const renderBooksForSearch = () => {
      if (!searchResult || searchResult.length === 0) {
        return <p className='empty-shelf'>Unfortunately, there is no book with this ISBN, title or author. Please, try again.</p>;
      }
      return searchResult.map((book, index) => (
        <BookItemForSearch key={index} book={book} />
      ));
    };
    return (
      <div>
        <HeaderLogged/>
          <div className='container'>
            {searchResult ? (
              <div>
                <h1 className='shelves-title'>Result of search by "{searchPar}"</h1>
                <div className="booklist">
                  <div className="booklist-header">
                    <span></span>
                    <span>Title & Author</span>
                    <span>Genre</span>
                    <span>Users</span>
                    <span></span>
                  </div>
                  <div >
                    {renderBooksForSearch()}
                  </div>
                </div>
              </div>
            ):(
              <p>Loading search information...</p>
            )}
          </div>
        </div>
    )
}

export default SearchPage;