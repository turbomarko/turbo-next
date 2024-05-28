#!/bin/sh

# Arguments
c1=$1  # Environment
c2=$2  # Command
c3=$3  # Command argument (optional)


# Help command
help() {
  echo "Usage: <environment> <command> [<command argument>]"
  echo "environment:"
  echo "* local"
  echo "* production"
  echo ""
  echo "command:"
  echo "* build -- build the docker image"
  echo "* up -- start the docker container"
  echo "* down -- stop the docker container"
}


# App commands
build() {
  docker-compose -f docker-compose."$c1".yml build
}

up() {
  docker-compose -f docker-compose."$c1".yml up
}

down() {
  docker-compose -f docker-compose."$c1".yml down
}

case "$c1" in
  "local"|"production")
    $c2;;
  *)
    help;;
esac
