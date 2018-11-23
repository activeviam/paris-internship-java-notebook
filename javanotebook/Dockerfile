FROM openjdk:10-slim

ENV RUNNER_SLEEP=0

# Add a jhipster user to run our application so that it doesn't need to run as root
RUN adduser --gecos --disabled-password --shell /bin/sh runner
WORKDIR /home/runner

ADD entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh && chown runner:runner entrypoint.sh
USER runner

ADD target/java-notebook-0.1.0.jar app.jar

ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 8080
