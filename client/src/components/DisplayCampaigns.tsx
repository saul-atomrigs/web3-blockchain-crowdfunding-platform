import React from "react"
import { useNavigate } from "react-router-dom"
import { loader } from "../assets"
import { v4 as uuidv4 } from "uuid"
import FundCard from "./FundCard"

type DisplayCampaignProps = {
 title: string
 isLoading: boolean
 campaigns: CampaignProps[]
}

type CampaignProps = {
 owner?: string
 title: any
 description?: string
 target?: number
 deadline?: string
 amountCollected?: number
 image?: string
}

export default function DisplayCampaigns({
 title,
 isLoading,
 campaigns,
}: DisplayCampaignProps) {
 const navigate = useNavigate()

 const handleNavigate = (campaign: CampaignProps) => {
  navigate(`/campaign-details/${campaign.title}`, { state: campaign })
 }

 return (
  <div>
   {/* 캠페인 총 개수를 보여줌 */}
   <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
    {title} ({campaigns.length})
   </h1>

   {/* 로딩 인디케이터 */}
   <div className="flex flex-wrap mt-[20px] gap-[26px]">
    {isLoading && (
     <img
      src={loader}
      alt="loader"
      className="w-[100px] h-[100px] object-contain"
     />
    )}

    {/* 캠페인이 아무것도 없을 때 (로딩중이지도 않을 때) */}
    {!isLoading && !campaigns.length && (
     <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
      You have not created any campigns yet
     </p>
    )}

    {/* 캠페인이 하나라도 있을 때: */}
    {!isLoading &&
     campaigns.length &&
     campaigns.map((campaign) => (
      <FundCard
       key={uuidv4()}
       handleClick={() => handleNavigate(campaign)}
       {...campaign}
      />
     ))}
   </div>
  </div>
 )
}
