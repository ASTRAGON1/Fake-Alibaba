# Backend Route Requirements

Based on the `backend/routes` file structure and `frontend/Functional_requirements.md`.

## 1. `user.js` (Base: `/api/users`)
- **POST** `/api/users/register` - User registration (Buyer/Seller) [Req 1.1]
- **POST** `/api/users/login` - User login [Req 1.2]
- **POST** `/api/users/logout` - User logout [Req 1.2]
- **POST** `/api/users/refresh-token` - Refresh JWT token [Req 1.2]
- **POST** `/api/users/forgot-password` - Initiate password reset [Req 1.3]
- **POST** `/api/users/reset-password` - Complete password reset [Req 1.3]
- **PUT** `/api/users/password` - Change password (logged in) [Req 1.3]
- **GET** `/api/users/profile` - View user profile information [Req 1.4]
- **PUT** `/api/users/profile` - Update user profile details [Req 1.4]
- **DELETE** `/api/users/profile` - Delete user account [Req 1.4]
- **POST** `/api/users/profile/avatar` - Upload profile picture [Req 1.4]
- **GET** `/api/users/addresses` - Get saved shipping addresses [Req 1.4]
- **POST** `/api/users/addresses` - Add new shipping address [Req 1.4]
- **PUT** `/api/users/addresses/:id` - Update shipping address [Req 1.4]
- **DELETE** `/api/users/addresses/:id` - Delete shipping address [Req 1.4]
- **GET** `/api/users/seller/profile` - Get seller specific profile [Req 8.2]
- **PUT** `/api/users/seller/profile` - Update seller store info [Req 8.2]
- **GET** `/api/users/seller/analytics` - Get seller dashboard stats [Req 8.1, 8.4]

## 2. `product.js` (Base: `/api/products`)
- **POST** `/api/products` - Create new product (Seller) [Req 2.1]
- **GET** `/api/products` - Get all products (with search/filter/sort kwargs) [Req 2.3, 6.1, 6.2, 6.3]
- **GET** `/api/products/seller/my-products` - Get logged-in seller's products [Req 2.2]
- **POST** `/api/products/bulk-upload` - Bulk upload products via CSV [Req 2.1]
- **GET** `/api/products/suggestions` - Search autocomplete suggestions [Req 6.1]
- **GET** `/api/products/:id` - Get single product details [Req 2.3]
- **PUT** `/api/products/:id` - Update product details [Req 2.2]
- **DELETE** `/api/products/:id` - Delete product [Req 2.2]
- **GET** `/api/products/:id/related` - Get related products [Req 2.3]
- **PUT** `/api/products/:id/stock` - Update specific product stock [Req 8.3]

## 3. `category.js` (Base: `/api/categories`)
- **GET** `/api/categories` - Get all categories (tree structure) [Req 2.4]
- **GET** `/api/categories/popular` - Get popular categories [Req 2.4]
- **GET** `/api/categories/:id` - Get single category details [Req 2.4]
- **POST** `/api/categories` - Create new category (Admin) [Req 9.2]
- **PUT** `/api/categories/:id` - Update category (Admin) [Req 9.2]
- **DELETE** `/api/categories/:id` - Delete category (Admin) [Req 9.2]

## 4. `cart.js` (Base: `/api/carts`)
- **GET** `/api/carts` - Get current user's cart [Req 3.2]
- **POST** `/api/carts` - Add item to cart [Req 3.1]
- **PUT** `/api/carts/item/:id` - Update cart item quantity [Req 3.1]
- **DELETE** `/api/carts/item/:id` - Remove item from cart [Req 3.1]
- **DELETE** `/api/carts` - Clear entire cart [Req 3.1]
- **POST** `/api/carts/apply-coupon` - Apply discount code [Req 3.2]

## 5. `order.js` (Base: `/api/orders`)
- **POST** `/api/orders` - Place a new order [Req 4.1]
- **GET** `/api/orders` - Get logged-in user's order history [Req 4.2]
- **GET** `/api/orders/seller` - Get orders for the logged-in seller [Req 4.3]
- **GET** `/api/orders/:id` - Get specific order details [Req 4.2]
- **PUT** `/api/orders/:id/cancel` - Request order cancellation (Buyer) [Req 4.2]
- **PUT** `/api/orders/:id/status` - Update order status (Seller/Admin) [Req 4.3]
- **PUT** `/api/orders/:id/tracking` - Add tracking info (Seller) [Req 4.3]
- **POST** `/api/orders/:id/refund` - Request return/refund [Req 4.2]

## 6. `review.js` (Base: `/api/reviews`)
- **POST** `/api/reviews/product/:productId` - Add review for a product [Req 7.1]
- **GET** `/api/reviews/product/:productId` - Get reviews for a product [Req 7.2]
- **PUT** `/api/reviews/:id` - Edit review [Req 7.1]
- **DELETE** `/api/reviews/:id` - Delete review [Req 7.1]
- **PUT** `/api/reviews/:id/helpful` - Mark review as helpful [Req 7.1]
- **POST** `/api/reviews/seller/:sellerId` - Rate a seller [Req 7.3]
- **GET** `/api/reviews/seller/:sellerId` - Get seller reviews [Req 7.3]

## 7. `wishlist.js` (Base: `/api/wishlist`)
- **GET** `/api/wishlist` - Get user's wishlist [Req 11.1]
- **POST** `/api/wishlist` - Add product to wishlist [Req 11.1]
- **DELETE** `/api/wishlist/:productId` - Remove product from wishlist [Req 11.1]
- **POST** `/api/wishlist/:productId/move-to-cart` - Move item from wishlist to cart [Req 11.1]

## 8. `message.js` (Base: `/api/message`)
- **GET** `/api/message/conversations` - Get list of conversations [Req 12.1]
- **GET** `/api/message/conversations/:id` - Get messages in a specific conversation [Req 12.1]
- **POST** `/api/message` - Send a message [Req 12.1]
- **PUT** `/api/message/:id/read` - Mark message as read [Req 12.1]
- **POST** `/api/message/support` - Create support ticket [Req 12.2]
- **GET** `/api/message/support` - Get user's support tickets [Req 12.2]

## 9. `notification.js` (Base: `/api/notification`)
- **GET** `/api/notification` - Get user notifications [Req 10.2]
- **PUT** `/api/notification/:id/read` - Mark notification as read [Req 10.2]
- **DELETE** `/api/notification/:id` - clear notification [Req 10.2]

## 10. `admin.js` (Base: `/api/admin`)
- **GET** `/api/admin/users` - List all users [Req 9.1]
- **PUT** `/api/admin/users/:id/role` - Assign user roles [Req 9.1]
- **PUT** `/api/admin/users/:id/status` - Ban/Unban user [Req 9.1]
- **GET** `/api/admin/sellers` - List all sellers [Req 9.4]
- **PUT** `/api/admin/sellers/:id/approve` - Approve seller application [Req 9.4]
- **PUT** `/api/admin/products/:id/approve` - Approve/Reject product listing [Req 9.2]
- **GET** `/api/admin/stats` - Get system-wide analytics (sales, growth, etc) [Req 9.7]
- **GET** `/api/admin/content` - Get site content configurations [Req 9.5]
- **PUT** `/api/admin/content` - Update site content (banners, FAQs) [Req 9.5]


# Frontend Routes

## Public Routes
- **Home**: `/`
- **Products**: `/products`
- **Product Details**: `/products/:id`
- **Login**: `/login`
- **Signup**: `/signup`
- **Forgot Password**: `/forgot-password`
- **Reset Password**: `/reset-password`

## Buyer Protected Routes
- **Cart**: `/cart`
- **Checkout**: `/checkout`
- **Profile**: `/profile`
- **My Orders**: `/orders`
- **Order Details**: `/orders/:id`
- **Wishlist**: `/wishlist`

## Seller Protected Routes (Base: `/seller`)
- **Dashboard**: `/seller/dashboard`
- **My Products**: `/seller/products`
- **Add Product**: `/seller/products/add`
- **Edit Product**: `/seller/products/edit/:id`
- **Seller Orders**: `/seller/orders`

## Admin Protected Routes (Base: `/admin`)
- **Dashboard**: `/admin/dashboard`
- **Manage Users**: `/admin/users`
- **Manage Orders**: `/admin/orders`
- **Manage Products**: `/admin/products`
