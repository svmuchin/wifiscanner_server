provider "heroku" {
  version = "~> 2.0"
}

variable "app_name" {}
variable "jwt_secret" {}
variable "admin_email" {}
variable "admin_default_passport" {}

resource "heroku_config" "env" {
  vars = {
    NPM_CONFIG_PRODUCTION = true
    JWT_SECRET = "${var.jwt_secret}"
    ADMIN_EMAIL = "${var.admin_email}"
    ADMIN_DEFAULT_PASSWORD = "${var.admin_default_passport}"
  }
}

resource "heroku_app" "server" {
  name   = "${var.app_name}"
  region = "eu"
}

resource "heroku_app_config_association" "config" {
  app_id = "${heroku_app.server.id}"

  vars = "${heroku_config.env.vars}"
}

resource "heroku_addon" "database" {
  app  = "${heroku_app.server.name}"
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_build" "defaut" {
  app = "${heroku_app.server.name}"
  buildpacks = ["https://github.com/heroku/heroku-buildpack-nodejs"]

  source = {
    path = "."
  }
}

resource "heroku_formation" "default" {
  app = "${heroku_app.server.name}"
  type = "web"
  quantity = 1
  size = "free"
  depends_on = ["heroku_build.defaut"]
}

output "app_url" {
  value = "https://${heroku_app.server.name}.herokuapp.com"
}
