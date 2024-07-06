import React from 'react'
import TextsAndTwoIcons from './TextsAndTwoIcons'
import FilterIndicators from './FilterIndicators'
import EachCrmClient from './EachCrmClient'
import { CRM_CLIENTS } from '../../../dummy_data/dymmy_data'
import { useState } from 'react'


export default function CrmClientsBody() {
    const [sortByName, setSortByName] = useState(null);
    const [sortBySurname, setSortBySurname] = useState(null);
    const [sortByAge, setSortByAge] = useState(null);

    // functions
    function handleSortByName() {
        if (sortByName === null || sortByName === "asc") {
            setSortByName("desc");
        } else if (sortByName === "desc") {
            setSortByName("asc");
        }
        setSortBySurname(null);
        setSortByAge(null);
    }

    function handleSortBySurname() {
        if (sortBySurname === null || sortBySurname === "asc") {
            setSortBySurname("desc");
        } else if (sortBySurname === "desc") {
            setSortBySurname("asc");
        }
        setSortByName(null);
        setSortByAge(null);
    }

    function handleSortByAge() {
        if (sortByAge === null || sortByAge === "asc") {
            setSortByAge("desc");
        } else if (sortByAge === "desc") {
            setSortByAge("asc");
        }
        setSortByName(null);
        setSortBySurname(null);
    }
  
  return (
    <div className='crmClientsBody'>
        <TextsAndTwoIcons />

        <div className="h-6 w-full mt-[32px] flex flow-row">
            <div className="h-full w-[35%] flex flex-row items-center justify-between pl-[60px]">
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortBySurname}>
                    <span 
                        style={{
                            color: !sortBySurname ? "black" : "rgba(58, 185, 109, 1)",
                        }}
                        className='text-[13px] font-medium'>Фамилия
                    </span>
                    <FilterIndicators topActive={sortBySurname === "asc"} bottomActive={sortBySurname === "desc"}  />
                </div>
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortByName}>
                    <span 
                        style={{
                            color: !sortByName ? "black" : "rgba(58, 185, 109, 1)",
                        }}
                        className='text-[13px] font-medium'>Имя
                    </span>
                    <FilterIndicators topActive={sortByName === "asc"} bottomActive={sortByName === "desc"} />
                </div>
                <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <span className='text-[13px] font-medium'>Постоянство</span>
                    <FilterIndicators  />
                </div>
            </div>

            <div className="h-full w-[20%]">

            </div>
            <div className="h-full w-[17%]">
                <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <span className='text-[13px] font-medium'>Активность</span>
                    <FilterIndicators  />
                </div>
            </div>

            <div className="h-full w-[8%]">
                <div className="flex flex-row items-center justify-center gap-1 cursor-pointer" onClick={handleSortByAge}>
                    <span 
                        style={{
                            color: !sortByAge ? "black" : "rgba(58, 185, 109, 1)",
                        }}
                        className='text-[13px] font-medium'>Возраст
                    </span>
                    <FilterIndicators topActive={sortByAge === "asc"} bottomActive={sortByAge === "desc"} />
                </div>
            </div>
            <div className="h-full w-[12%]">
                <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <span className='text-[13px] font-medium'>Заведение</span>
                    <FilterIndicators  />
                </div>
            </div>
            <div className="h-full w-[8%]">
                <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <span className='text-[13px] font-medium'>Заметки</span>
                    <FilterIndicators  />
                </div>
            </div>
        </div>

        {
            [...CRM_CLIENTS]
            .sort((a, b) => (
                sortByName === "desc" ? a.name.localeCompare(b.name) :
                sortByName === "asc" ? b.name.localeCompare(a.name) :
                sortBySurname === "desc" ? a.surname.localeCompare(b.surname) :
                sortBySurname === "asc" ? b.surname.localeCompare(a.surname) :
                sortByAge === "desc" ? a.age - b.age :
                sortByAge === "asc" ? b.age - a.age : 0
            ))
            .map((client, index) => {
                return <EachCrmClient key={index} {...client} />
            })
        }
    </div>
  )
}
