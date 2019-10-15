import React from 'react';
import {Badge, Card, Col, Icon, Row, Tooltip} from 'antd';
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../constants/dragItemTypes";
import {TeamPlayerIcon} from "./TeamPlayerIcon";

export function TeamCard(props) {

    let teamPower = 0;

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        drop: (item) => props.updatePlayerToTeam(item.playerObject, props.team),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    let playersInterface = [];
    if (props.team.players != null) {

        props.team.players.forEach(function (element, index) {
            teamPower += element ? parseInt(element.power) : 0;

            let playerRepresentation;

            if (element != null) {
                playerRepresentation = <span><Icon type="user"/>{element.playerIndex + 1}</span>
            } else {
                playerRepresentation = <Icon type="question"/>
            }

            playersInterface.push(<Col key={index} span={6}>{playerRepresentation}</Col>)
        });
    }


    return (
        <div ref={drop}>

            <Card
                style={{
                    width: "auto",
                    background: isOver ? "#f6ffed" : "white",
                }}
                extra={<Tooltip placement="top" title="Power"><Badge count={teamPower.toLocaleString()} overflowCount={99999999} style={{ backgroundColor: '#52c41a' }}/></Tooltip>}
                title={"Team " + (props.team.teamIndex + 1 )}>
                <Row>
                    {
                        props.team.players.map((element, index) => {
                            return <TeamPlayerIcon key={index} player={element}/>
                        })
                    }
                </Row>
            </Card>
        </div>
    )
}



