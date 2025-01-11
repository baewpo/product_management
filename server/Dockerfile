FROM openjdk:17-jdk-slim

WORKDIR /app

COPY ./target/demo-0.0.1-SNAPSHOT.jar /app/demo-0.0.1-SNAPSHOT.jar

RUN ls /app

RUN chmod +x /app/demo-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/demo-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080
