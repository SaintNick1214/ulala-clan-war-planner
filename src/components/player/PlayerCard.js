import React from 'react';
import {Button, Card} from "antd";
import {useDrag} from "react-dnd";
import {ItemTypes} from "../../constants/dragItemTypes";

const {Meta} = Card;

export function PlayerCard(props) {

    const onUpdatePlayerClick = () => {
        let player = props.value;
        player.playerIndex = props.playerIndex;
        props.onUpdatePlayerClick(player);
    };

    const onDeletePlayerClick = () => {
        props.onDeletePlayerClick(props.playerIndex);
    };

    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.PLAYER,
            playerObject: props.value
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const actions = <span>
            <Button type="dashed" icon="edit" onClick={onUpdatePlayerClick}/>
            <Button type="dashed" icon="delete" onClick={onDeletePlayerClick}/>
        </span>

    return (
        <div ref={drag}
             style={{
                 opacity: isDragging ? 0.5 : 1,
                 cursor: 'move'
             }}>
            <Card
                style={{width: "auto", marginTop: 5}}
                title={"(" + (props.playerIndex + 1) + ") " + props.value.name}
                extra={actions}
            >
                <Meta title={props.value.class.label}
                      description={props.value.power}/>
            </Card>
        </div>
    );
}

