FROM openjdk:21
WORKDIR /app
COPY . .
# Build the application using Maven Wrapper
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/expensetracker-0.0.1-SNAPSHOT.jar"]