# URL Shortener 🚀

A simple and efficient URL shortener built using Node.js and Express. This project allows users to shorten long URLs into concise, easy-to-share links.

## Features ✨

- 🔗 Shorten long URLs
- 📊 Track click counts
- ⚡ Fast and lightweight
- 🔒 Secure and reliable
- 🌍 Custom short URLs (optional)

## Technologies Used 🛠️

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (or any other preferred database)
- **Frontend:** HTML, CSS, JavaScript (optional for UI)
- **Other:** Short Unique ID Generator

## Installation & Setup 🚀

1. Clone the repository:
   ```sh
   git clone https://github.com/mahesh2-lab/url-shortner.git
   ```
2. Navigate to the project directory:
   ```sh
   cd url-shortner
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   BASE_URL=http://localhost:5000
   ```
5. Start the server:
   ```sh
   npm start
   ```

## Usage 📌

1. **Shorten a URL:** Send a POST request to `/api/shorten` with a long URL.
2. **Redirect to Original URL:** Access the shortened URL to get redirected.
3. **Analytics (Optional):** Track the number of visits per shortened URL.

## API Endpoints 🌐

| Method | Endpoint       | Description                |
|--------|---------------|----------------------------|
| POST   | `/api/shorten` | Shortens a long URL       |
| GET    | `/:shortCode`  | Redirects to the long URL |

## Example Request 📌

```sh
POST /api/shorten
Content-Type: application/json
{
  "longUrl": "https://example.com"
}
```

## Example Response 📩

```json
{
  "shortUrl": "http://localhost:5000/abcd123"
}
```

## Contributing 🤝

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License 📜

This project is licensed under the MIT License.

---

🚀 **Made with ❤️ by [Mahesh](https://github.com/mahesh2-lab)**

