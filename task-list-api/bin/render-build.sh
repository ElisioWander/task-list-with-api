#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install

# Se você estiver usando uma instância gratuita, execute as migrações no build
# Descomente a linha abaixo se necessário:

# bundle exec rails db:migrate