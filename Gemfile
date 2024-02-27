source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.2"
gem "rails", "7.1.3"

gem "devise"
gem "dotenv-rails"
gem "jsbundling-rails"
gem "pg", "~> 1.5"
gem "propshaft"
gem "mina"

group :production do
  gem "passenger", ">= 5.3.2", require: "phusion_passenger/rack_handler"
end

group :development, :test do
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "puma", ">= 5.0"
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
