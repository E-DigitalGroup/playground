// src/lib/utilities/date.js

/**
 * Date Utilities Module
 * 
 * This module provides utility functions for handling date-related operations.
 * It includes functions to get the current date and to format a given date.
 */

/**
 * Get Current Date
 * 
 * Retrieves the current date and time.
 * 
 * @returns {Date} The current date and time as a JavaScript Date object.
 */
function getCurrentDate() {
    return new Date();
  }
  
  /**
   * Format Date
   * 
   * Formats a given Date object into an ISO string.
   * 
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date as an ISO string.
   */
  function formatDate(date) {
    return date.toISOString();
  }
  
  // Export the utility functions for use in other modules
  module.exports = {
    getCurrentDate,
    formatDate,
  };
  