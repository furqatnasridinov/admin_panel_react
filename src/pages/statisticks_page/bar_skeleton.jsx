import React from 'react'

export default function BarSkeleton() {
  return (
    <div className='w-[1100px]  pt-[10px] pb-[5px] pl-[5px] relative'>
        <div className="flex flex-col gap-[32px]">
            <div className="flex flex-row gap-1 items-center">
                <div className="w-[20px] h-[7px] bg-skeleton-main"></div>
                <div className="w-full h-[1px] bg-bg-color"></div>
            </div>
            <div className="flex flex-row gap-1 items-center">
                <div className="w-[20px] h-[7px] bg-skeleton-main"></div>
                <div className="w-full h-[1px] bg-bg-color"></div>
            </div>
            <div className="flex flex-row gap-1 items-center">
                <div className="w-[20px] h-[7px] bg-skeleton-main"></div>
                <div className="w-full h-[1px] bg-bg-color"></div>
            </div>
            <div className="flex flex-row gap-1 items-center">
                <div className="w-[20px] h-[7px] bg-skeleton-main"></div>
                <div className="w-full h-[1px] bg-bg-color"></div>
            </div>
            
        </div>

        <div className="absolute left-[40px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[80px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[120px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[30px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[200px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[50px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[280px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[40px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[360px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[120px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[440px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[90px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[520px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[60px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[600px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[20px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[680px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[50px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[760px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[50px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[840px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[60px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[920px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[65px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>

        <div className="absolute left-[1000px] bottom-[8px] flex-col gap-[30px]">
            <div className="w-[50px] h-[95px] rounded-[8px] bg-blue-200"></div>
            {/* <div className="w-[50px] h-[10px] bg-purple-500"></div> */}
        </div>
    </div>
  )
}

