import Rating from '@mui/material/Rating';
import {Progress} from 'antd';
import {useEffect, useState} from "react";

const RatingProgess = ({ratings, idProduct}) => {
    const [vote1Quantity, setVote1Quantity] = useState([1, 2]);
    const [vote2Quantity, setVote2Quantity] = useState([1]);
    const [vote3Quantity, setVote3Quantity] = useState([]);
    const [vote4Quantity, setVote4Quantity] = useState([]);
    const [vote5Quantity, setVote5Quantity] = useState([]);

    // format
    function formatProgessVote(quantity) {
        return ((quantity.length / ratings.length) * 100);
    }

    //
    function numberStar(starQuantity, ratings) {
        switch (starQuantity) {
            case 0:
                setVote1Quantity(ratings);
                break;
            case 1:
                setVote2Quantity(ratings);
                break;
            case 2:
                setVote3Quantity(ratings);
                break;
            case 3:
                setVote4Quantity(ratings);
                break;
            case 4:
                setVote5Quantity(ratings);
                break;
            default:
                break;
        }
    }

    // call api by rating length
    const CountRatingProgess = (voteQuantity, starQuantity) => {
        useEffect(() => {
            fetch('http://127.0.0.1:8000/api/ratings-quantity-' + starQuantity + '/' + idProduct, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((respon) => respon.json())
                .then((data) => {
                    console.log(data);
                    numberStar(starQuantity, data.ratings)
                })
                .catch((error) => console.log(error));
        }, [idProduct]);
    }

    /// Call 
    CountRatingProgess(vote1Quantity, 0);
    CountRatingProgess(vote2Quantity, 1);
    CountRatingProgess(vote3Quantity, 2);
    CountRatingProgess(vote4Quantity, 3);
    CountRatingProgess(vote5Quantity, 4);

    return (
        <>
            {/* 1 star */}
            <div style={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                {'1'}<Rating name="half-rating-read" max={1} defaultValue={1} precision={0.5} readOnly/>
                <Progress percent={formatProgessVote(vote1Quantity)} status='exception' showInfo={false}/>
                <p>{vote1Quantity.length} lượt đánh giá
                    ({formatProgessVote(vote1Quantity) % 1 === 0 ? formatProgessVote(vote1Quantity) : formatProgessVote(vote1Quantity).toFixed(2)}%)</p>
            </div>
            {/* 2 star */}
            <div style={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                {'2'}<Rating name="half-rating-read" max={1} defaultValue={1} precision={0.5} readOnly/>
                <Progress percent={formatProgessVote(vote2Quantity)} status='exception' showInfo={false}/>
                <p>{vote2Quantity.length} lượt đánh giá
                    ({formatProgessVote(vote2Quantity) % 1 === 0 ? formatProgessVote(vote2Quantity) : formatProgessVote(vote2Quantity).toFixed(2)}%)</p>
            </div>
            {/* 3 star */}
            <div style={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                {'3'}<Rating name="half-rating-read" max={1} defaultValue={1} precision={0.5} readOnly/>
                <Progress percent={formatProgessVote(vote3Quantity)} status='exception' showInfo={false}/>
                <p>{vote3Quantity.length} lượt đánh giá
                    ({formatProgessVote(vote3Quantity) % 1 === 0 ? formatProgessVote(vote3Quantity) : formatProgessVote(vote3Quantity).toFixed(2)}%)</p>
            </div>
            {/* 4 star */}
            <div style={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                {'4'}<Rating name="half-rating-read" max={1} defaultValue={1} precision={0.5} readOnly/>
                <Progress percent={formatProgessVote(vote4Quantity)} status='exception' showInfo={false}/>
                <p>{vote4Quantity.length} lượt đánh giá
                    ({formatProgessVote(vote4Quantity) % 1 === 0 ? formatProgessVote(vote4Quantity) : formatProgessVote(vote4Quantity).toFixed(2)}%)</p>
            </div>
            {/* 5 star */}
            <div style={{display: 'flex', alignItems: 'center', columnGap: '12px'}}>
                {'5'}<Rating name="half-rating-read" max={1} defaultValue={1} precision={0.5} readOnly/>
                <Progress percent={formatProgessVote(vote5Quantity)} status='exception' showInfo={false}/>
                <p>{vote5Quantity.length} lượt đánh giá
                    ({formatProgessVote(vote5Quantity) % 1 === 0 ? formatProgessVote(vote5Quantity) : formatProgessVote(vote5Quantity).toFixed(2)}%)</p>
            </div>
        </>
    );
}

export default RatingProgess;