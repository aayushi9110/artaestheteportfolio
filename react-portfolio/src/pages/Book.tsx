const Book = () => {
  return (
    <div id="pg-book" className="pg">
      <div className="book-page">
        <div className="book-l">
          <div className="book-l-c">
            <span className="sec-label gold">Get Started</span>
            <h2>Book a <em>Consultation</em></h2>
            <p>Every remarkable interior begins with a single conversation.</p>
            <div className="book-faq">
              {/* FAQ items */}
            </div>
          </div>
        </div>
        <div className="book-r">
          {/* Booking form */}
        </div>
      </div>
    </div>
  );
};

export default Book;