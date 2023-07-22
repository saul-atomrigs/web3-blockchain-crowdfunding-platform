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

    function createCampaign() {}

    function donateToCampaign() {}

    function getDonators() {}

    function getCampaigns() {}
}