require "application_system_test_case"

class RootSystemTest < ApplicationSystemTestCase
  test "load the home page" do
    visit root_url

    assert_text "How To Play"
  end
end
