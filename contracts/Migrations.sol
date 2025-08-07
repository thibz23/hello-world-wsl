// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Migrations {
  address public immutable owner; // Use immutable for gas optimization
  uint public last_completed_migration;

  error NotOwner(); // Custom errors save gas compared to require strings

  modifier restricted() {
    if (msg.sender != owner) revert NotOwner(); // Use custom error for gas efficiency
    _;
  }

  constructor() {
    owner = msg.sender; // Set in constructor since it's immutable
  }

  function setCompleted(uint completed) external restricted {
    last_completed_migration = completed;
  }

  // Optimized version - removed hardcoded value function as it's not efficient
  function setCompletedWithVariable(uint value) external restricted {
    last_completed_migration = value;
  }
}
