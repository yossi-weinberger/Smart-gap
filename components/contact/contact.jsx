import "./contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <div className="form-container">
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">שם מלא</label>
            <input type="text" id="email" name="email" required />
            <label htmlFor="email">מספר טלפון</label>
            <input type="text" id="email" name="email" required />
            <label htmlFor="email">כתובת אימייל</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="textarea">מה נוכל לעזור?</label>
            <textarea
              name="textarea"
              id="textarea"
              // rows="5"
              // cols="20"
              required
            />
          </div>
          <button className="form-submit-btn" type="submit">
            שלח
          </button>
        </form>
      </div>
    </div>
  );
}
