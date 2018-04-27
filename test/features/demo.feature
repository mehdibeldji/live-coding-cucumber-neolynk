@api
Feature: Live demo Cucumber

  @200
  Scenario: Http call to node JS
    Given I set X-Mock-Id header to neolynk-demo
    When I send a GET request to "/"
    Then The response code should be 200
    And The response should contain "toto"
  
  @404
  Scenario: Http call 404
    Given I send a GET request to "/toto"
    Then The response code should be 404
    