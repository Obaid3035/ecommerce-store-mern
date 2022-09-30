import React from 'react';
import ReactStars from 'react-stars';

interface IRating {
    avgRating: number;
}

const RatingStar: React.FC<IRating> = ({avgRating}) => {
    return (
        <ReactStars
            count={5}
            value={avgRating}
            half={true}
            edit={false}
            size={20}
            color2="#003f67"
        />
    );
};

export default RatingStar;
