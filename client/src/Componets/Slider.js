import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import './Slider.css'; // Import your custom CSS

export default function Slider() {
    var items = [
        {
            // name: "Random Name #1",
            // description: "Probably the most random thing you have ever seen!",
            imageUrl: "./images/img1.jpg"
        },
        {
            // name: "Random Name #2",
            // description: "Hello World!",
            imageUrl: "./images/img2.jpg"
        },
        {
            // name: "Random Name #1",
            // description: "Probably the most random thing you have ever seen!",
            imageUrl: "./images/img3.jpg"
        },
        {
            // name: "Random Name #2",
            // description: "Hello World!",
            imageUrl: "./images/img4.jpg"
        },
        {
            // name: "Random Name #1",
            // description: "Probably the most random thing you have ever seen!",
            imageUrl: "./images/img5.jpg"
        },
        {
            // name: "Random Name #2",
            // description: "Hello World!",
            imageUrl: "./images/img6.jpg"
        },
       
    ];

    return (
        <Carousel>
            {items.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
}

function Item(props) {
    return (


        <Paper className="CarouselItem">
            <img src={props.item.imageUrl} alt={props.item.name} className="CarouselImage" />
            <div className="CarouselContent">
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
                {/* <Button className="CheckButton">
                    Check it out!
                </Button> */}
            </div>
        </Paper>
    );
}