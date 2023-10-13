import React, { useEffect, useState } from "react"
import { useStateContext } from "../context"
import { DisplayCampaigns } from "../components"

export default function Profile() {
 const [isLoading, setIsLoading] = useState(false)
 const [campaigns, setCampaigns] = useState([])

 const { address, contract, getUserCampaigns } = useStateContext()

 const fetchCampaigns = async () => {
  setIsLoading(true)

  try {
   const campaigns = await getUserCampaigns()
   setCampaigns(campaigns)
  } catch (err) {
   console.log(err)
  } finally {
   setIsLoading(false)
  }
 }

 useEffect(() => {
  if (contract && address) {
   fetchCampaigns()
  }
 }, [contract, address])

 return (
  <DisplayCampaigns
   title="All campaigns"
   isLoading={isLoading}
   campaigns={campaigns}
  />
 )
}
