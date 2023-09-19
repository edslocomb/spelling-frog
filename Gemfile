source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"
gem "rails", "7.0.8"

gem "devise"
gem "jsbundling-rails"
gem "pg", "~> 1.5"
gem "propshaft"
gem "puma", ">= 5.0"

group :development, :test do
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv"
end

group :development do
  gem "spring"
  gem "standard"
  gem "standard-rails"
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
