import React, {useState, useEffect} from 'react';
import './App.css';

const winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function App() {
    const [square, onChange] = useState(Array(9).fill(null));

    const nextStep = () => {
        const key = Math.floor(Math.random() * Math.floor(9));
        let newArr = square;

        if (square.some(item => item === null)) {
            if (square[key] === null) {
                newArr[key] = 'o';
                onChange([...newArr]);
            } else {
                nextStep()
            }
        }
    };

    const getWinner = () => {
        winnerLine.forEach((item, index) => {
            if ((square[item[0]] === 'x' && square[item[1]] === 'x' && square[item[2]] === 'x') || (square[item[0]] === 'o' && square[item[1]] === 'o' && square[item[2]] === 'o')) {
                document.querySelector('.winner-line').classList.add(`line-${index}`);

                setTimeout(() => {
                    onChange(Array(9).fill(null));
                    document.querySelector('.winner-line').classList.remove(`line-${index}`);
                }, 3000)
            }
        })
    };


    const handleClick = (e) => {
        const key = e.target.getAttribute('data');
        let newArr = square;

        newArr[key] = 'x';
        onChange([...newArr]);
        nextStep();
    };

    useEffect(getWinner, [square])


    return (
        <div className='wrapper'>
            <div className="App">
                {square.map((item, index) => (
                    <div key={index} onClick={handleClick} data={index}>
                        {item}
                    </div>
                ))}

                <div className="winner-line">

                </div>
            </div>
        </div>
    );
}

export default App;
