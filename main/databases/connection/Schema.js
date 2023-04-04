const { reviewImageLimit } = require('../validate/ValidityCheck'); 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const arrayValidator = require('mongoose-array-validator')

const accountSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false, unique: true },
    address: { type: String, required: false },
    account_created_with: { type: String, required: false },
    password: { type: String, required: false, unique: true },
    otp: { type: Number, required: true, unique: true },
    is_verified: { type: Boolean, required: false, default: false },
    last_login: { type: Date, required: false },
    devices_logged_in: { type: Array, required: false, default: [] },
    wallet: { type: Number, required: false },
    date_created: { type: Date, required: false },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const cartSchema = new Schema({
    email_or_phone: { type: String, required: true, unique: true },
    product_info: { type: Array, required: true, default: [] },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const orderSchema = new Schema({
    order_id: { type: String, required: true, unique: true },
    total_products: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
    product_info: { type: Array, required: true, default: [] },
    email_or_phone: { type: String, required: true },
    delivery_option: { type: String, required: true, default: 'no' },
    receiver_name: { type: String, required: false },
    receiver_phone: { type: String, required: false },
    receiver_address: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    date_ordered: { type: Date, required: true },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const categorySchema = new Schema({
    category_name: { type: String, required: true, unique: true },
    category_image: { type: String, required: false },
    category_id: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const productSchema = new Schema({
    category_id: { type: String, required: true, unique: false },
    product_name: { type: String, required: true },
    product_id: { type: String, required: true, unique: true },
    original_price: { type: Number, required: true },
    discounted_price: { type: Number, required: false },
    discounted_percentage: { type: Number, required: false },
    description: { type: String, required: true },
    dimension: { type: String, required: true },
    quantity: { type: Number, required: true },
    colors: { type: String, required: true },
    product_images: { type: Array, required: true, default: [] },
    views: { type: Number, required: false },
    group: { type: String, required: true, default: 'none' },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const paymentSchema = new Schema({
    email_or_phone: { type: String, required: true },
    payment_type: { type: String, required: true },
    transfer_info: { type: Object, default: {}},
    credit_card_info: { type: Object, default: {}},
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});


const notificationSchema = new Schema({
    email_or_phone: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    time: { type: Date, required: true },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const supportSchema = new Schema({
    email_or_phone: { type: String, required: true },
    message: { type: String, required: false },
    from: { type: String, required: false },
    read_by_admin: { type: Boolean, default: false },
    read_time: { type: Date, required: true },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const reviewSchema = new Schema({
    email_or_phone: { type: String, required: true },
    // name: { type: String, required: true },  //to get name, use email or phoneand scan account table to get name
    image: { type: Array, required: false, default: [], maxItems: reviewImageLimit },
    product_id: { type: String, required: true },
    reply: { type: String, required: true, maxLength: 200, },
    first_reply_time: { type: Date, required: true },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});
reviewSchema.plugin(arrayValidator);

const wishlistSchema = new Schema({
    email_or_phone: { type: String, required: true },
    product_id: { type: String, required: true },
    createdAt: { type: Date, required: true, immutable: true },
    updatedAt: { type: Date, required: true }
});

const accountTable = mongoose.model('account', accountSchema);
const cartTable = mongoose.model('cart', cartSchema);
const orderTable = mongoose.model('order', orderSchema);
const categoryTable = mongoose.model('category', categorySchema);
const productTable = mongoose.model('product', productSchema);
const paymentTable = mongoose.model('payment', paymentSchema);
const notificationTable = mongoose.model('notification', notificationSchema);
const supportTable = mongoose.model('support', supportSchema);
const reviewTable = mongoose.model('review', reviewSchema);
const wishlistTable = mongoose.model('wishlist', wishlistSchema);

module.exports = {
    accountTable,
    cartTable,
    orderTable,
    categoryTable,
    productTable,
    paymentTable,
    notificationTable,
    supportTable,
    reviewTable,
    wishlistTable
}