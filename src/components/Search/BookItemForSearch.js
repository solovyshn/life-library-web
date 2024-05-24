import { useNavigate } from 'react-router-dom';

function BookItemForSearch({ book }) {
    const navigate = useNavigate();

    const goToBookPage = (book) => {
      navigate(`/book/${book.ISBN}`);
      localStorage.setItem('ISBN', book.ISBN);
    }

    return (
      <div className="bookitem">
        <div className="book-info">
            <div className="book-shelf-cover">
                <img src={book.image_url} alt={`${book.title} cover`} />
            </div>
            <div className="book-title-author">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
            </div>
          <div className="book-genre">{book.genre}</div>
          <div className="book-owners">
            {book.users && book.users.length > 0 ? (
                book.users.map((owner, index) => (
                    <p key={index} className="owner-name">{owner.name}</p>
                ))
            ) : (
                <p className="no-owner">No one from your region has this book</p>
            )}
        </div>
          <div className="book-more-info" onClick={() => goToBookPage(book)}>See more info</div>
        </div>
      </div>
    );
  }

  export default BookItemForSearch;