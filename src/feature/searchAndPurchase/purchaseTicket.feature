Feature: Search and Purchase on Renfe Website

  Scenario: Purchase a ticket with an invalid credit card
    Given the user is on the Renfe website
    When the user selects the destination "VALENCIA JOAQUIN SOROLLA" to "BARCELONA-SANTS"
    And the user enters personal information
    And the user proceeds to checkout
    And the user enters an invalid credit card information
    Then the user should see an error message "credit card is not valid"
