// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target; // 캠페인이 목표하는 투자 유치 금액
        uint256 deadline; // 캠페인 마감일
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0; 

    /** 캠페인을 생성하는 함수 */
    function createCampaign(address _owner, string memory _title, string memory _description , uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        // Campaign 스트럭트를 생성. 캠페인에 대한 모든 정보들을 저장한다:
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // is everything ok? 마감일이 미래 시점인지 테스트:
        require(campaign.deadline < block.timestamp, "Deadline should be in the future");

        // Campaign 스트럭트에 변수들을 저장:
        // owner 필드에는 _owner 파라미터값이 assign된다
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;    

        // 누적 캠페인의 개수를 증가시킨다:
        numberOfCampaigns++;
        
        // 캠페인의 개수를 리턴한다:
        return numberOfCampaigns - 1;
    }

    /** 캠페인에 투자하는(donate) 함수 */
    function donateToCampaign(uint256 _id) public payable {
        // 투자 금액:
        uint256 amount = msg.value;

        // 투자 대상 캠페인:
        Campaign storage campaign = campaigns[_id];

        // 투자자를 캠페인의 donators 배열에 추가:
        campaign.donators.push(msg.sender);
        // 투자금액을 캠페인의 donations 배열에 추가:
        campaign.donations.push(amount);

        // call메서드를 사용하여 캠페인 소유자에게 투자금액을 전송:
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
        // 투자금액을 캠페인의 amountCollected에 누적:
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    /** 캠페인의 정보(투자자,투자내역)를 리턴하는 함수 */
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    /** 컨트랙트 내 모든 캠페인들을 불러오는 함수 */    
    function getCampaigns() public view returns (Campaign[] memory) {
        // Campaign 스트럭트 배열을 생성:
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        // 캠페인의 개수만큼 반복하면서 Campaign 스트럭트를 생성:
        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            // 새로운 Campaign 스트럭트를 생성:
            Campaign storage item = campaigns[i];

            // item을 allCampaigns 배열에 추가:
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}