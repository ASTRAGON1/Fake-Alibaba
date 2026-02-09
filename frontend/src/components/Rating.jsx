import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color = '#f8e825', onRate = null, readOnly = true }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center">
            <div className="flex mr-2">
                {stars.map((star) => (
                    <span
                        key={star}
                        onClick={() => !readOnly && onRate && onRate(star)}
                        className={!readOnly ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
                        style={{ color }}
                    >
                        {value >= star ? (
                            <FaStar />
                        ) : value >= star - 0.5 ? (
                            <FaStarHalfAlt />
                        ) : (
                            <FaRegStar />
                        )}
                    </span>
                ))}
            </div>
            {text && <span className="text-sm text-gray-500">{text}</span>}
        </div>
    );
};

export default Rating;
