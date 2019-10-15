import React from 'react';
import {Col, Icon, Popover} from "antd";
import {PlayerCard} from "../player/PlayerCard";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../constants/dragItemTypes";

export function TeamPlayerIcon(props) {

    let playerRepresentation;

    let {player} = props;

    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.PLAYER,
            playerObject: player
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    if (player != null) {
        let popoverContent = <PlayerCard value={player}/>
        playerRepresentation =
            <div ref={drag}
                 style={{
                     opacity: isDragging ? 0.5 : 1,
                     cursor: 'move'
                 }}>
                <Popover
                    content={popoverContent}
                    trigger="hover"><Icon type="user"/>{player.playerIndex + 1}</Popover>
            </div>
    } else {
        playerRepresentation = <Icon type="question"/>
    }

    return (
        <Col span={6}>{playerRepresentation}</Col>
    )
}