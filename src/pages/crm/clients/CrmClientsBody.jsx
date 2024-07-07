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
    const [sortByActivities, setSortByActivities] = useState(null);
    const [sortByGyms, setSortByGyms] = useState(null);
    const [sortByNotes, setSortByNotes] = useState(null);

    // functions
    function handleSortByName() {
        if (sortByName === null || sortByName === "asc") {
            setSortByName("desc");
        } else if (sortByName === "desc") {
            setSortByName("asc");
        }
        setSortBySurname(null);
        setSortByAge(null);
        handleSortByActivities(null);
        setSortByGyms(null);
        setSortByNotes(null);
    }

    function handleSortBySurname() {
        if (sortBySurname === null || sortBySurname === "asc") {
            setSortBySurname("desc");
        } else if (sortBySurname === "desc") {
            setSortBySurname("asc");
        }
        setSortByName(null);
        setSortByAge(null);
        setSortByActivities(null);
        setSortByGyms(null);
        setSortByNotes(null);
    }

    function handleSortByAge() {
        if (sortByAge === null || sortByAge === "asc") {
            setSortByAge("desc");
        } else if (sortByAge === "desc") {
            setSortByAge("asc");
        }
        setSortByName(null);
        setSortBySurname(null);
        setSortByActivities(null);
        setSortByGyms(null);
        setSortByNotes(null);

    }

    function handleSortByActivities() {
        if (sortByActivities === null || sortByActivities === "asc") {
            setSortByActivities("desc");
        } else if (sortByActivities === "desc") {
            setSortByActivities("asc");
        }
        setSortByName(null);
        setSortBySurname(null);
        setSortByAge(null);
        setSortByGyms(null);
        setSortByNotes(null);
    }

    function handleSortByGyms() {
        if (sortByGyms === null || sortByGyms === "asc") {
            setSortByGyms("desc");
        } else if (sortByGyms === "desc") {
            setSortByGyms("asc");
        }
        setSortByName(null);
        setSortBySurname(null);
        setSortByAge(null);
        setSortByActivities(null);
        setSortByNotes(null);
    }

    function handleSortByNotes() {
        if (sortByNotes === null || sortByNotes === "asc") {
            setSortByNotes("desc");
        } else if (sortByNotes === "desc") {
            setSortByNotes("asc");
        }
        setSortByName(null);
        setSortBySurname(null);
        setSortByAge(null);
        setSortByActivities(null);
        setSortByGyms(null);
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
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortByActivities}>
                    <span 
                        style={{
                            color: !sortByActivities ? "black" : "rgba(58, 185, 109, 1)",
                        }}
                        className='text-[13px] font-medium'>Активность</span>
                    <FilterIndicators topActive={sortByActivities === "asc"} bottomActive={sortByActivities === "desc"} />
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
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortByGyms}>
                    <span 
                        style={{
                            color: !sortByGyms ? "black" : "rgba(58, 185, 109, 1)",
                        }}
                        className='text-[13px] font-medium'>Заведение</span>
                    <FilterIndicators topActive={sortByGyms === "asc"} bottomActive={sortByGyms === "desc"}/>
                </div>
            </div>
            <div className="h-full w-[8%]">
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortByNotes}>
                    <span 
                        style={{
                            color: !sortByNotes ? "black" : "rgba(58, 185, 109, 1)",
                        }}
                        className='text-[13px] font-medium'>Заметки</span>
                    <FilterIndicators topActive={sortByNotes === "asc"} bottomActive={sortByNotes === "desc"} />
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
                sortByAge === "asc" ? b.age - a.age : 
                sortByActivities === "desc" ? a.activities[0].localeCompare(b.activities[0]) :
                sortByActivities === "asc" ? b.activities[0].localeCompare(a.activities[0]) : 
                sortByGyms === "desc" ? a.gyms[0].localeCompare(b.gyms[0]) :
                sortByGyms === "asc" ? b.gyms[0].localeCompare(a.gyms[0]) : 
                sortByNotes === "desc" ? b.note.localeCompare(a.note) :
                sortByNotes === "asc" ? a.note.localeCompare(b.note) : 0
            ))
            .map((client, index) => {
                return <EachCrmClient key={index} {...client} />
            })
        }
    </div>
  )
}