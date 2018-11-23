#!/bin/sh

echo "The application will start in ${RUNNER_SLEEP}s..." && sleep ${RUNNER_SLEEP}
exec java -jar "${HOME}/app.jar" "$@"
