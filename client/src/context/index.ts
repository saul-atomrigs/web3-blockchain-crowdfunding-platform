import {
 useAddress,
 useContract,
 useContractWrite,
 useMetamask,
} from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { createContext } from "react"

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
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
  const campaigns = await contract.call("getCampaigns")

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
}
