package com.todofirebase.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		ensureDatabaseExists();
		SpringApplication.run(BackendApplication.class, args);
	}

	private static void ensureDatabaseExists() {
		String url = "jdbc:postgresql://localhost:5432/postgres";
		String user = "postgres";
		String password = "Indocyber1";
		String dbName = "todo_db";

		try (Connection conn = DriverManager.getConnection(url, user, password);
				Statement stmt = conn.createStatement()) {

			// Check if database exists
			ResultSet rs = stmt.executeQuery("SELECT 1 FROM pg_database WHERE datname = '" + dbName + "'");
			if (!rs.next()) {
				// Create database
				System.out.println("Database '" + dbName + "' does not exist. Creating it...");
				stmt.executeUpdate("CREATE DATABASE " + dbName);
				System.out.println("Database '" + dbName + "' created successfully.");
			} else {
				System.out.println("Database '" + dbName + "' already exists.");
			}
		} catch (SQLException e) {
			System.err.println("Failed to check/create database: " + e.getMessage());
			// Continue execution, maybe it exists but connection failed, or let Spring fail
			// later if critical
		}
	}

}
