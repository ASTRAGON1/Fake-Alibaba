export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
};

export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'delivered':
        case 'completed':
        case 'active':
        case 'in stock':
            return 'success';
        case 'pending':
        case 'processing':
        case 'low stock':
            return 'warning';
        case 'cancelled':
        case 'rejected':
        case 'out of stock':
        case 'inactive':
            return 'danger';
        case 'shipped':
        case 'published':
            return 'info';
        default:
            return 'secondary';
    }
};
