// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    struct Campign {
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

    mapping(uint256 => Campign) public campigns;

    uint256 public numberOfCampigns = 0; 

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
        numberOfCampigns++;
        
        // 캠페인의 개수를 리턴한다:
        return numberOfCampigns - 1;
    }

    function donateToCampaign() {}

    function getDonators() {}

    function getCampaigns() {}
}