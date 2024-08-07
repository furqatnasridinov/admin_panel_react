import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownOutlined } from '../subscribtion/Accordion' 
import { MembershipCard } from './Memberships';
import { getWeekdaysIds } from '../../../config/apphelpers';


export default function AccordionGyms({
    isOpened,
    radioOn = false,
    toggle,
    gymName = "Crystall",
    gymId = 1,
    memberShips = [],
    selectMembership,
    selectedMembershipId,
    selectedMembershipGymId,
    viewOnly = false,
    showRadio = true,
    showButtons = false,
    hideAddButton = false,
}) {
    const [shownTooltipId, setShownTooltipId] = useState(false);
    const [isExpandedId, setIsExpandedId] = useState(false);
    const contentRef = useRef(null);
    //const [height, setHeight] = useState('40px');

    /* useEffect(() => {
        if (contentRef.current) {
            if (isOpened) {
                setHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setHeight('40px');
            }
        }
    }, [isOpened]); */

    return <div 
        ref={contentRef}
        style={{
            height: "fit-content", //height,
            transition: 'height 0.3s ease',
            //backgroundColor: "red"
        }} className="flex flex-col">
        <div className="rowSpaceBetween p-2 cursor-pointer" onClick={toggle}>
            <div className="rowGap16">
                {showRadio && <RadioButton radioOn={radioOn} />}
                <div className="rowGap10">
                    <div className="arrowIndicatorFrame">
                        <div className={isOpened ? "rotate-icon" : "arrow-icon"}>
                            <ArrowDownOutlined />
                        </div>
                    </div>
                    <span className='headerH2'>{gymName}</span>
                    {viewOnly && <span className='headerH2 text-grey-text'>({memberShips.length})</span>}
                </div>
            </div>
            
        </div>
        {isOpened && 
           <div className="columnWithNoGap">
                {memberShips.map((item, index) => {
                    return <div
                        key={index}
                        className="rowGap16 p-2 cursor-pointer"
                        onClick={() => {
                            if (!viewOnly) {
                                selectMembership(gymId, item.id);
                            }
                        }}>
                        {showRadio &&
                            <RadioButton radioOn={selectedMembershipId === item.id && selectedMembershipGymId === gymId} />
                        }
                        
                        <MembershipCard 
                            listWidth='85%' 
                            showButtons = {showButtons}
                            hideAddButton={hideAddButton}
                            showProgress={false}
                            description={item.description || "Описание отсутствует"}
                            gyms={item.gyms.map(gym => gym.name)}
                            name={item.name}
                            price={item.price}
                            subcategories={item.lessonSubTypes.map(subType => subType.name) ?? null}
                            lessonTypes={item.lessonTypes || []}
                            oldPrice={item.oldPrice || null}
                            sliceIndex={7}
                            selectedWeekdays={getWeekdaysIds(item.daysOfWeek)}
                            privileges={item.privileges || "Пусто"}
                            restrictions={item.restrictions || "Пусто"}
                            freezingCancellation={item.freezingCancellation || "Пусто"}
                            isExpanded={isExpandedId === item.id}
                            showTooltip={shownTooltipId === item.id}
                            setShowTooltip={()=>setShownTooltipId(item.id)}
                            onExpand={() => {
                                setIsExpandedId(isExpandedId === item.id ? 0 : item.id);
                                setShownTooltipId(0);
                            }}
                        />
                    </div>
                })}
           </div>
        }
    </div>
}

function RadioButton({
    radioOn = false,

}) {
    return <div style={{ borderColor: radioOn ? "rgba(58, 185, 109, 1)" : "transparent"}} className="indicatorShape">
        <div style={{ backgroundColor: radioOn ? "rgba(58, 185, 109, 1)" : "transparent" }} className="indicatorMain"></div>
    </div>
}