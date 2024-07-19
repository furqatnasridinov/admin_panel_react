import React from 'react'
import TextsAndTwoIcons from './TextsAndTwoIcons'
import FilterIndicators from './FilterIndicators'
import EachCrmClient from './EachCrmClient'
import { CRM_CLIENTS } from '../../../dummy_data/dymmy_data'
import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function CrmClientsBody() {
    const [sortByName, setSortByName] = useState(null);
    const [sortBySurname, setSortBySurname] = useState(null);
    const [sortByAge, setSortByAge] = useState(null);
    const [sortByActivities, setSortByActivities] = useState(null);
    const [sortByGyms, setSortByGyms] = useState(null);
    const [sortByNotes, setSortByNotes] = useState(null);
    const [sortByIndicators, setSortByIndicators] = useState(null);
    const clients = useSelector((state) => state.crmClients.listOfUsers);
    //const loading = useSelector((state) => state.crmClients.listOfUsersLoading);

    // functions
    function handleSortByName() {
        if (sortByName === null || sortByName === "asc") {
            setSortByName("desc");
        } else if (sortByName === "desc") {
            setSortByName("asc");
        }
        setSortBySurname(null);
        setSortByAge(null);
        setSortByActivities(null);
        setSortByGyms(null);
        setSortByNotes(null);
        setSortByIndicators(null);
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
        setSortByIndicators(null);
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
        setSortByIndicators(null);
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
        setSortByIndicators(null);
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
        setSortByIndicators(null);
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
        setSortByIndicators(null);
    }

    function handleSortByIndicators() {
        if (sortByIndicators === null || sortByIndicators === "asc") {
            setSortByIndicators("desc");
        } else if (sortByIndicators === "desc") {
            setSortByIndicators("asc");
        }
        setSortByName(null);
        setSortBySurname(null);
        setSortByAge(null);
        setSortByActivities(null);
        setSortByGyms(null);
        setSortByNotes(null);
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
                            userSelect: "none"
                        }}
                        className='text-[13px] font-medium'>Фамилия
                    </span>
                    <FilterIndicators topActive={sortBySurname === "asc"} bottomActive={sortBySurname === "desc"}  />
                </div>
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortByName}>
                    <span 
                        style={{
                            color: !sortByName ? "black" : "rgba(58, 185, 109, 1)",
                            userSelect: "none"
                        }}
                        className='text-[13px] font-medium'>Имя
                    </span>
                    <FilterIndicators topActive={sortByName === "asc"} bottomActive={sortByName === "desc"} />
                </div>
                <div className="flex flex-row items-center gap-1 cursor-pointer">
                    <span 
                        style={{
                            color: !sortByIndicators ? "black" : "rgba(58, 185, 109, 1)",
                            userSelect: "none"
                        }}
                        className='text-[13px] font-medium' onClick={handleSortByIndicators}>Постоянство</span>
                    <FilterIndicators topActive={sortByIndicators === "asc"} bottomActive={sortByIndicators === "desc"}  />
                </div>
            </div>

            <div className="h-full w-[20%]">

            </div>
            <div className="h-full w-[17%]">
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={handleSortByActivities}>
                    <span 
                        style={{
                            color: !sortByActivities ? "black" : "rgba(58, 185, 109, 1)",
                            userSelect: "none"
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
                            userSelect: "none"
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
                            userSelect: "none"
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
                            userSelect: "none"
                        }}
                        className='text-[13px] font-medium'>Заметки</span>
                    <FilterIndicators topActive={sortByNotes === "asc"} bottomActive={sortByNotes === "desc"} />
                </div>
            </div>
        </div>

        {
            [...clients]
            .sort((a, b) => (
                sortByName === "desc" ? a.firstName?.localeCompare(b.firstName) :
                sortByName === "asc" ? b.firstName?.localeCompare(a.firstName) :
                sortBySurname === "desc" ? a.lastName?.localeCompare(b.lastName) :
                sortBySurname === "asc" ? b.lastName?.localeCompare(a.lastName) :
                sortByAge === "desc" ? a.age - b.age :
                sortByAge === "asc" ? b.age - a.age : 
                sortByActivities === "desc" ? (a.lessonTypes && b.lessonTypes && a.lessonTypes[0]?.localeCompare(b?.lessonTypes[0])) :
                sortByActivities === "asc" ? (b.lessonTypes && a.lessonTypes && b.lessonTypes[0]?.localeCompare(a?.lessonTypes[0])) : 
                sortByGyms === "desc" ? a.gyms[0]?.localeCompare(b.gyms[0]) :
                sortByGyms === "asc" ? b.gyms[0]?.localeCompare(a.gyms[0]) : 
                sortByNotes === "desc" ? b.note?.localeCompare(a.note) :
                sortByNotes === "asc" ? a.note?.localeCompare(b.note) : 
                sortByIndicators === "desc" ? b.green - a.green :
                sortByIndicators === "asc" ? a.green - b.green : 0
            ))
            .map((client, index) => {
                return <EachCrmClient 
                key={index} 
                activities={client.lessonTypes ?? []} 
                age={client.age ?? 0}
                gyms={client.gyms ?? []}
                avatar={client.avatar ?? ""} 
                email={client.email ?? ""}
                name={client.firstName ?? ""}
                surname={client.lastName ?? ""}
                patronymic={client.patronymic ?? ""}
                phone={client.contactPhone ?? ""}
                note={client.note ?? ""}
                gray={client.gray ?? 0}
                green={client.green ?? 0}
                red={client.red ?? 0}
                id={client.id ?? 0}
                />
            })
        }
    </div>
  )
}
