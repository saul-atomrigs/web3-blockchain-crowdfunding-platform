import React, { useEffect, useState } from "react"
import { useStateContext } from "../context"
import { DisplayCampaigns } from "../components"

export default function Home() {
 const [isLoading, setIsLoading] = useState(false)
 const [campaigns, setCampaigns] = useState([])

 const { address, contract, getCampaigns } = useStateContext()

 const fetchCampaigns = async () => {
  setIsLoading(true)

  try {
   const campaigns = await getCampaigns()
   setCampaigns(campaigns)
  } catch (err) {
   console.log(err)
  } finally {
   setIsLoading(false)
  }
 }

 useEffect(() => {
  if (contract) {
   fetchCampaigns()
  }
 }, [address, contract])

 return (
  <DisplayCampaigns
   title="All Campaigns"
   isLoading={isLoading}
   campaigns={campaigns}
  />
 )
}
