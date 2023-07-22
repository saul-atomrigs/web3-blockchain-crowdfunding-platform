// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
    struct Campign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campign) public campigns;

    uint256 public numberOfCampigns = 0; 

    function createCampaign(address _owner, string memory _title, string memory _description , uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // is everything ok? 테스트:
        require(campaign.deadline < block.timestamp, "Deadline should be in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampigns++;
        
        return numberOfCampigns - 1;
    }

    function donateToCampaign() {}

    function getDonators() {}

    function getCampaigns() {}
}