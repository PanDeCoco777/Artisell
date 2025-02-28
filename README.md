# Artisell - Filipino Art E-commerce Platform

## Database Setup

### Using phpMyAdmin

1. Make sure you have XAMPP, WAMP, MAMP, or any other local server with phpMyAdmin installed
2. Start your Apache and MySQL services
3. Open phpMyAdmin at http://localhost/phpmyadmin/
4. Create a new database named `artisell_db`
5. Import the SQL file from `sql/artisell_db.sql` to set up the database schema and sample data

### Database Structure

The database consists of the following tables:

- `users` - Stores user account information
- `products` - Contains artwork details
- `product_images` - Stores images for each artwork
- `categories` - Art categories
- `product_categories` - Many-to-many relationship between products and categories
- `carts` - Shopping carts for users
- `cart_items` - Items in shopping carts
- `orders` - Customer orders
- `order_items` - Items in orders
- `favorites` - User's favorite artworks

## API Integration

The frontend React application communicates with the PHP backend through API endpoints. The main API endpoints are:

- `/api/products` - For artwork data
- `/api/users` - For user account management
- `/api/auth` - For authentication (login/register)
- `/api/cart` - For shopping cart operations
- `/api/orders` - For order processing

## Running the Application

1. Start your local server (Apache and MySQL)
2. Place the PHP files in your web server directory
3. Run the React frontend with `npm run dev`
4. Access the application at the provided URL

## Development Notes

- The frontend is built with React, Vite, and Tailwind CSS
- The backend uses PHP with a MySQL database
- Authentication is handled through sessions and JWT tokens
- All database operations are performed through prepared statements to prevent SQL injection
