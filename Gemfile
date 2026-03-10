source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.4.8"
gem "rails", "8.1.2"

gem "devise"
gem "dotenv"
gem "jsbundling-rails"
gem "pg"
gem "propshaft"
gem "mina"

group :production do
  gem "passenger", require: "phusion_passenger/rack_handler"
end

group :development, :test do
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "puma"
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
