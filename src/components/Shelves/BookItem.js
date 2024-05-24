import { useNavigate } from "react-router-dom";

function BookItem({ book }) {
  const navigate = useNavigate()
  const goToBookPage = async (bookISBN) => {
    localStorage.setItem('ISBN', bookISBN)
    navigate(`/book/${bookISBN}`);
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
          <div className="book-date">{book.update_date}</div>
          <div className="book-more-info" onClick={() => goToBookPage(book['ISBN'])}>See more info</div>
        </div>
      </div>
    );
  }

  export default BookItem;