import React from 'react';

export interface BrawlObj {
    name: string,
    drink: string,
    business1Pic: string,
    business2Pic: string,
    startDate: Date,
    endDate: Date,
    winnerId: number,
    business1Id: number,
    business2Id: number,
    id: number
}

interface States {

}

interface Props {

}

class Brawl extends React.Component<Props, States> {

}

export default Brawl;