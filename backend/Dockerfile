#FROM maven:3.9.6-eclipse-temurin-17 AS build
#COPY . .
#RUN mvn clean package -DskipTests
#
#FROM openjdk:17.0.2-jdk-slim
#COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","backend-0.0.1-SNAPSHOT.jar"]

#FROM maven:3.9.6-eclipse-temurin-17 AS build
FROM openjdk:17-jdk-alpine as build
WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .


RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:17.0.2-jdk-slim

ARG DEPENDENCY=/app/target/dependency

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
EXPOSE 8082

ENTRYPOINT ["java","-cp","app:app/lib/*","com.tasktrack.backend.BackendApplication"]
