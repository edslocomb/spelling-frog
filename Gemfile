source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.0"
gem "rails", "~> 7.0.4", ">= 7.0.4.3"

gem "jsbundling-rails"
gem "pg", "~> 1.1"
gem "propshaft"
gem "puma", "~> 5.0"

group :development, :test do
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv"
end

group :development do
  # gem "spring"
  gem "standard"
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
