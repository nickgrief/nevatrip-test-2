import React from 'react';
import { createFactory, useMemo, useState } from 'react';
import { v4 as ukey } from 'uuid';

const Mark: React.FC<{ markStyle: string; markText: string }> = ({
    markStyle,
    markText,
}) => {
    return (
        <>
            {markText !== '' && (
                <div
                    className={`absolute text-sm font-semibold min-w-fit p-2 w-[25%] sm:w-[15%] flex justify-center items-center ${
                        markStyle === 'orange' && `bg-[#FED74B] top-12 h-8`
                    } ${
                        markStyle === 'violet' &&
                        `bg-[#7553FF] text-white rounded-tl-2xl rounded-br-2xl h-12`
                    } ${
                        markStyle === 'blue' &&
                        `bg-[#099CE8] text-white top-12 h-8`
                    }`}
                >
                    {markText}
                </div>
            )}
        </>
    );
};

const Image: React.FC<{ src: string; markStyle: string; markText: string }> = ({
    src,
    markStyle,
    markText,
}) => {
    return (
        <div className='sm:min-h-full sm:w-5/12 shrink-0'>
            <Mark markStyle={markStyle} markText={markText} />
            <img
                className='rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl sm:h-[100%] sm:w-auto sm:object-cover'
                src={src}
                alt="Image of Saint's Petersburg"
            />
        </div>
    );
};

const Time: React.FC<{ time: number }> = ({ time }) => {
    return (
        <div className='flex gap-2 text-xs text-[#9E9E9E]'>
            <img className='w-4' src='./icons/clock.svg' alt='Clock Icon' />
            <p>{time} часа</p>
        </div>
    );
};

const Name: React.FC<{ name: string }> = ({ name }) => {
    return <h1 className='text-sm sm:order-first'>{name}</h1>;
};

const RaceTime: React.FC<{ time: string; shown: boolean; float: boolean }> = ({
    time,
    shown,
    float,
}) => {
    return (
        <button
            className={`bg-[#D9E8FF] w-16 h-fit text-center transition-all duration-300 p-[2px] rounded-xl text-[#343434] hover:bg-[#6BA6FF] hover:text-white ${
                float && `relative`
            }`}
        >
            {time}
        </button>
    );
};

const Schedule: React.FC<{ raceTimes: string[] }> = ({ raceTimes }) => {
    const [isFloatShown, setIsFloatShown] = useState(false);

    const raceEls =
        raceTimes.length > 4
            ? raceTimes.slice(0, 3).map((time) => {
                  return (
                      <RaceTime
                          key={ukey()}
                          time={time}
                          shown={true}
                          float={false}
                      />
                  );
              })
            : raceTimes.map((time) => {
                  return (
                      <RaceTime
                          key={ukey()}
                          time={time}
                          shown={true}
                          float={false}
                      />
                  );
              });

    const onMoreClick = () => {
        setIsFloatShown(!isFloatShown);
    };

    const raceBtn = (
        <button
            onClick={onMoreClick}
            className={`bg-[#D9E8FF] w-16 h-fit text-center p-[2px] rounded-xl text-[#343434] transition-all duration-300 hover:bg-[#6BA6FF] hover:text-white ${
                isFloatShown && `bg-[#6BA6FF] text-white`
            }`}
        >
            еще...
        </button>
    );

    const raceFloat = raceTimes.slice(3).map((time) => {
        return (
            <RaceTime
                key={ukey()}
                time={time}
                shown={isFloatShown}
                float={true}
            />
        );
    });

    return (
        <li
            key={ukey()}
            className='grid mb-6 grid-rows-2 grid-cols-[max-content_1fr] relative gap-x-4 gap-y-1 items-center'
        >
            <img
                className='w-4'
                src='./icons/checkmark.svg'
                alt='Check Mark Icon'
            />
            <p className='min-w-fit'>Ближайший рейс сегодня</p>
            <div></div>
            <div className='flex w-full gap-1 flex-wrap justify-start'>
                {raceEls}
                {raceTimes.length > 4 && raceBtn}
                <div
                    className={`absolute top-14 flex gap-1 ${
                        !isFloatShown
                            ? `opacity-0 pointer-events-none`
                            : `opacity-100`
                    }`}
                >
                    {raceTimes.length > 4 && raceFloat}
                </div>
            </div>
        </li>
    );
};

const List: React.FC<{ bulletPoints: string[]; races: string[] }> = ({
    bulletPoints,
    races,
}) => {
    return (
        <ul className='text-sm text-[#4B4B4B] flex flex-col gap-3 mb-auto'>
            {bulletPoints.map((point) => {
                return (
                    <li key={ukey()} className='flex gap-4'>
                        <img src='./icons/checkmark.svg' alt='Check Mark Icon' />
                        <p>{point}</p>
                    </li>
                );
            })}
            <Schedule raceTimes={races} />
        </ul>
    );
};

const Price: React.FC<{ priceMain: number; priceSecond: string }> = ({
    priceMain,
    priceSecond,
}) => {
    return (
        <div className='flex justify-between sm:justify-start h-fit gap-4 items-center'>
            <div className='flex justify-center flex-col'>
                <div className='flex items-baseline gap-[1px]'>
                    <div className='text-3xl'>{priceMain}</div>
                    <img
                        className='w-[19px] h-[21px]'
                        src='./icons/ruble.png'
                        alt='Ruble Icon'
                    />
                </div>
                {priceSecond !== '' && (
                    <p className='text-[10px] -mt-[4px]'>{priceSecond}</p>
                )}
            </div>
            <button className='bg-[#FED74B] hover:bg-yellow-500 transition-all w-40 px-5 py-2 rounded-[20px] border-[1px] border-solid border-[#CBA500] text-center'>
                Подробнее
            </button>
        </div>
    );
};

const Info: React.FC<{ card: CardData }> = ({ card }) => {
    return (
        <div className='p-3 flex flex-col gap-3 w-full justify-start min-h-full'>
            <Time time={card.time} />
            <Name name={card.name} />
            <List bulletPoints={card.bulletPoints} races={card.races} />
            <Price priceMain={card.priceMain} priceSecond={card.priceSecond} />
        </div>
    );
};

const Card: React.FC<{ card: CardData }> = ({ card }) => {
    return (
        <div className='relative m-4 border-[1px] border-[#828282] rounded-2xl sm:w-11/12 h-fit sm:flex'>
            <Image
                src={card.image}
                markStyle={card.markStyle}
                markText={card.markText}
            />
            <Info card={card} />
        </div>
    );
};

interface CardData {
    name: string;
    time: number;
    bulletPoints: string[];
    races: string[];
    priceMain: number;
    priceSecond: string;
    image: string;
    markStyle: 'blue' | 'violet' | 'orange';
    markText: string;
}

let data: CardData[] = [
    {
        name: 'Экскурсия по ключевым архитектурным достопримечательностям Санкт-Петербурга',
        time: 4,
        bulletPoints: [
            'Билет на целый день',
            'Неограниченное число катаний',
            '6 остановок у главных достопримечательностей',
        ],
        races: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        priceMain: 2000,
        priceSecond: '2500р на месте',
        image: './images/piter.png',
        markStyle: 'orange',
        markText: 'НОВИНКА',
    },
    {
        name: 'АКЦИЯ - Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2019',
        time: 2,
        bulletPoints: [
            'Самые красивые виды Санкт-Петербурга',
            'Конкурсы и развлечения',
            '3 остановки у главных достопримечательностей',
        ],
        races: ['08:00', '11:00', '12:00'],
        priceMain: 900,
        priceSecond: '1200 р на причале',
        image: './images/bridge.png',
        markStyle: 'violet',
        markText: 'КРУГЛЫЙ ГОД',
    },
    {
        name: 'Экскурсия по самому древнему храму Санкт-Петербурга',
        time: 3,
        bulletPoints: [
            'Узнай историю красивейшего храма',
            'Познакомься с иконами величайших творцов',
        ],
        races: ['10:00', '10:30', '11:00', '11:30'],
        priceMain: 500,
        priceSecond: '',
        image: './images/church.png',
        markStyle: 'blue',
        markText: 'НОВИНКА',
    },
    {
        name: 'Концерт Вилиамо Де Лябибона. Классические произведения 17-ого века',
        time: 2,
        bulletPoints: [
            '12 самых красивых произведений 17-ого века',
            'Величайшие музыканты мира',
            'Неповторимый Вилиамо Де Лябибон',
        ],
        races: ['08:00', '11:00', '12:00', '12:30', '14:00', '18:00'],
        priceMain: 3000,
        priceSecond: '',
        image: './images/piano.png',
        markStyle: 'orange',
        markText: '',
    },
];

const App = () => {
    return (
        <div className='flex flex-col gap-1 justify-center items-center'>
            {data.map((card) => {
                return <Card key={ukey()} card={card} />;
            })}
        </div>
    );
};

export default App;
