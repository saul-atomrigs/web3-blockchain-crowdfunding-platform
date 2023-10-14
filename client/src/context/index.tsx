import {
 useAddress,
 useContract,
 useContractWrite,
 useMetamask,
} from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { createContext, useContext } from "react"

const StateContext = createContext(null)

type StateContextType = {
 children: React.ReactNode
}

export const StateContextProvider = ({ children }: StateContextType) => {
 const { contract } = useContract("0xf59A1f8251864e1c5a6bD64020e3569be27e6AA9")
 const { mutateAsync: createCampaign } = useContractWrite(
  contract,
  "createCampaign",
 )
 const address = useAddress()
 const connect = useMetamask()

 /** 캠페인을 생성 (data) */
 const publishCampaign = async (form) => {
  try {
   const data = await createCampaign({
    args: [
     address, // owner
     form.title,
     form.description,
     form.target,
     new Date(form.deadline).getTime(),
     form.image,
    ],
   })
  } catch (e: any) {
   console.log(e)
  }
 }

 /** 특정 컨트랙트로부터 캠페인들을 불러오고 메타데이터 형식으로 파싱 */
 const getCampaigns = async () => {
  const campaigns = await contract.call("getCampaigns") // 'getCampaigns' is the name of your function as it is on the smart contract

  const parsedCampaigns = campaigns.map((campaign, i) => ({
   owner: campaign.owner,
   title: campaign.title,
   description: campaign.description,
   target: ethers.utils.formatEther(campaign.target.toString()),
   deadline: campaign.deadline.toNumber(),
   amountCollected: ethers.utils.formatEther(
    campaign.amountCollected.toString(),
   ),
   image: campaign.image,
   pId: i,
  }))

  return parsedCampaigns
 }

 const getUserCampaigns = async () => {
  const allCampaigns = await getCampaigns()

  const filteredCampaigns = allCampaigns.filter(
   (campaign) => campaign.owner === address,
  )

  return filteredCampaigns
 }

 const donate = async (pId, amount) => {
  /**
   * @param 'donateToCampaign' is the name of your function as it is on the smart contract
   * @param [pId] (위 함수에 들어갈 인자 ) is the id of the campaign you want to donate to
   * @param { value: ethers.utils.parseEther(amount) } (오버라이드) is the amount you want to donate
   */
  const data = await contract.call("donateToCampaign", [pId], {
   value: ethers.utils.parseEther(amount),
  })

  return data
 }

 const getDonations = async (pId) => {
  const donations = await contract.call("getDonators", [pId])
  const numberOfDonations = donations[0].length

  const parsedDonations = []

  for (let i = 0; i < numberOfDonations; i++) {
   parsedDonations.push({
    donator: donations[0][i],
    donation: ethers.utils.formatEther(donations[1][i].toString()),
   })
  }

  return parsedDonations
 }

 return (
  <StateContext.Provider
   value={{
    address,
    contract,
    connect,
    createCampaign: publishCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
   }}>
   {children}
  </StateContext.Provider>
 )
}

export const useStateContext = () => useContext(StateContext)
