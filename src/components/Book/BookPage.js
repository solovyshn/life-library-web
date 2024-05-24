import React, {useState, useEffect} from "react";
import HeaderLogged from "../headerLogged";
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from "react-dropdown";

const BookPage = () => {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null)
    const accesstoken = localStorage.getItem('access_token');
    const ISBN = localStorage.getItem('ISBN')
    const [selectedShelf, setSelectedShelf] = useState('');
    const [options, setOptions] = useState(null) 
  
    const [isOpen, setIsOpen] = useState(false);
        
      const handleToggle = () => setIsOpen(!isOpen);

      const handleSelect = async (option) => {
        setSelectedShelf(option.label);
        setIsOpen(false);

        try {
            const response = await fetch('http://localhost:5000/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesstoken}`
                },
                body: JSON.stringify({
                    ISBN: ISBN,
                    shelf_name: option.label // Send the selected shelf name
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate(`/book/${ISBN}`);
        } catch (error) {
            console.error('Error adding book to shelf:', error);
        }
      };
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${ISBN}`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${accesstoken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBookData(data);   
            } catch (error) {
              console.error('Error fetching book information:', error);
            }
          };
          fetchBook();
        }, [ISBN, accesstoken]);
      
    
    return (
        <div>
            <HeaderLogged/>
            <div className='container'>
                <div className="book-infos">
                        { bookData ? (
                    <div className="book-header">
                        <img className="book-cover-big" src={bookData.book_details.image_url} alt={`${bookData.book_details.title} cover`} />
                        <div className="book-information">
                            <div className="title-author-info">
                                <h1>{bookData.book_details.title}</h1>
                                <hr className="separator" />
                                <h2>{bookData.book_details.author}</h2>
                            </div>
                            <div className="book-meta">
                                <div className='book-text-details'>
                                    <div className='info-row'>
                                        <span className='info-type'>Genre</span>
                                        <span className='info-value'>{bookData.book_details.genre}</span>
                                    </div>
                                    <div className='info-row'>
                                        <span className='info-type'>Year</span>
                                        <span className='info-value'>{bookData.book_details.year}</span>
                                    </div>
                                    <div className='info-row'>
                                        <span className='info-type'>ISBN</span>
                                        <span className='info-value'>{bookData.book_details.ISBN}</span>
                                    </div>
                                    <div className='info-row'>
                                        <span className='info-type'>Publisher</span>
                                        <span className='info-value'>{bookData.book_details.publisher}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="choose-shelf">
                            <Dropdown
                                options={bookData.shelves.map(shelf => ({
                                    value: shelf.shelf_id,
                                    label: shelf.shelf_name,
                                  }))}
                                onChange={handleSelect}
                                value={bookData.book_details.shelf_name || "None"}
                                placeholder="Select an option"
                                className="custom-dropdown"
                                controlClassName="custom-dropdown-control"
                                menuClassName="custom-dropdown-menu"
                                arrowClosed={<span className="custom-dropdown-arrow" />}
                                arrowOpen={<span className="custom-dropdown-arrow open" />}
                                onFocus={handleToggle}
                                onBlur={handleToggle}
                            />
                        </div>
                        <p className="book-description">{bookData.book_details.description}</p>
                    </div>
                ) : (
                    <p>in a minute</p>
                )}
                {/* <BookActions /> */}

                </div>
            </div>
    </div>)
}

export default BookPage;